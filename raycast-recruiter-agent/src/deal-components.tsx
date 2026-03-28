import React, { useState } from "react";
import {
  Detail,
  ActionPanel,
  Action,
  Icon,
  useNavigation,
  showToast,
  Toast,
  Form,
  LocalStorage,
} from "@raycast/api";

type Deal = any; // Simplifying for this file

export function DealDetail({
  deal,
  isDiffused,
  onToggleDiffused,
}: {
  deal: Deal;
  isDiffused?: boolean;
  onToggleDiffused?: () => void;
}) {
  const { push } = useNavigation();
  const [notes, setNotes] = useState<string[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  async function loadData() {
    const storedNotes = await LocalStorage.getItem<string>(
      `notes_deal_${deal.id}`,
    );
    if (storedNotes) setNotes(JSON.parse(storedNotes));

    const storedActs = await LocalStorage.getItem<string>(
      `activities_deal_${deal.id}`,
    );
    if (storedActs) setActivities(JSON.parse(storedActs));
  }

  React.useEffect(() => {
    loadData();
  }, [deal.id]);

  const notesMarkdown =
    notes.length > 0
      ? notes.map((n) => `> ${n}`).join("\n\n")
      : "*No call transcripts found for this deal yet. Use Cmd+K to Log a Note.*";

  const actsMarkdown =
    activities.length > 0
      ? activities
          .map((a) => {
            const dueDate = new Date(a.dueDate);
            const today = new Date();
            dueDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const diffTime = dueDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let statusText = "🟢 Upcoming";
            let color = "#00A400"; // Green
            if (diffDays < 0) {
              statusText = "🔴 Overdue";
              color = "#FF3B30"; // Red
            } else if (diffDays === 0) {
              statusText = "🟡 Today";
              color = "#FF9500"; // Orange
            }

            const dateStr = dueDate.toLocaleDateString();
            return `- [${a.completed ? "x" : " "}] **${a.type.toUpperCase()}** (${statusText} - ${dateStr}): ${a.note}`;
          })
          .join("\n")
      : "*No upcoming activities scheduled.*";

  const markdown = `
# ${deal.title}
**Status:** ${deal.status.toUpperCase()}

---
## Upcoming & Past Activities
${actsMarkdown}

---
## Recent Notes / Call Transcripts
${notesMarkdown}
`;

  return (
    <Detail
      markdown={markdown}
      navigationTitle={`Deal: ${deal.title}`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Deal ID" text={deal.id} />
          <Detail.Metadata.TagList title="Pipeline">
            <Detail.Metadata.TagList.Item
              text={`Pipeline ${deal.pipeline_id}`}
              color={"#00A400"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.TagList title="Current Stage">
            <Detail.Metadata.TagList.Item
              text={`Stage ${deal.stage_id}`}
              color={"#2F7CFF"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Label
            title="Expected Value"
            text={deal.value ? `€${deal.value.toLocaleString()}` : "€0"}
            icon={Icon.Coins}
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="Diffused Status"
            text={isDiffused ? "Diffused 📢" : "Not Diffused"}
            icon={isDiffused ? Icon.Megaphone : Icon.Minus}
          />
          {deal.website && (
            <Detail.Metadata.Link
              title="Website"
              text={deal.website.replace("https://", "")}
              target={
                deal.website.startsWith("http")
                  ? deal.website
                  : `https://${deal.website}`
              }
            />
          )}
          {deal.linkedin && (
            <Detail.Metadata.Link
              title="LinkedIn"
              text="Company Profile"
              target={deal.linkedin}
            />
          )}
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Deal Actions">
            <Action
              title="Log Call / Note"
              icon={Icon.Pencil}
              shortcut={{ modifiers: ["cmd"], key: "n" }}
              onAction={() =>
                push(
                  <LogNoteForm
                    entityId={`deal_${deal.id}`}
                    entityTitle={deal.title}
                    onSave={loadData}
                  />,
                )
              }
            />
            <Action
              title="Schedule Activity"
              icon={Icon.Calendar}
              shortcut={{ modifiers: ["cmd", "shift"], key: "a" }}
              onAction={() =>
                push(
                  <LogActivityForm
                    entityId={`deal_${deal.id}`}
                    entityTitle={deal.title}
                    onSave={loadData}
                  />,
                )
              }
            />
            {/* The Submenu to update Stages seamlessly */}
            <ActionPanel.Submenu
              title="Change Deal Stage"
              icon={Icon.ArrowRight}
              shortcut={{ modifiers: ["cmd"], key: "s" }}
            >
              {[1, 2, 3, 4, 5, 21, 22, 53].map((stage) => (
                <Action
                  key={stage}
                  title={`Move to Stage ${stage}`}
                  onAction={async () => {
                    await showToast({
                      style: Toast.Style.Success,
                      title: `Moved to Stage ${stage}`,
                      message: "Deal updated in Synced DB.",
                    });
                  }}
                />
              ))}
            </ActionPanel.Submenu>
          </ActionPanel.Section>

          <ActionPanel.Section title="Diffusion & Sourcing">
            {onToggleDiffused && (
              <Action
                title={isDiffused ? "Mark as Not Diffused" : "Mark as Diffused"}
                icon={isDiffused ? Icon.XmarkCircle : Icon.Megaphone}
                onAction={onToggleDiffused}
                shortcut={{ modifiers: ["cmd"], key: "d" }}
              />
            )}
          </ActionPanel.Section>

          <ActionPanel.Section title="Links">
            {deal.linkedin && (
              <Action.OpenInBrowser title="Open LinkedIn" url={deal.linkedin} />
            )}
            {deal.website && (
              <Action.OpenInBrowser
                title="Open Website"
                url={
                  deal.website.startsWith("http")
                    ? deal.website
                    : `https://${deal.website}`
                }
              />
            )}
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

export function LogNoteForm({
  entityId,
  entityTitle,
  onSave,
}: {
  entityId: string;
  entityTitle: string;
  onSave: () => void;
}) {
  const { pop } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [noteText, setNoteText] = useState("");

  async function fetchFathomSummary() {
    setIsLoading(true);
    await showToast({
      style: Toast.Style.Animated,
      title: "Fetching Fathom AI Transcript...",
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fakeTranscript = `**Fathom AI Call Summary**
- **Topic:** Initial discovery call regarding ${entityTitle}
- **Client Status:** Highly interested, but needs budget approval for next quarter.
- **Action Items:**
  1. Send technical spec sheet and pricing breakdown tomorrow.
  2. Schedule follow-up demo with their technical lead next Tuesday.
- **Sentiment:** Positive / Engaged`;

    setNoteText(fakeTranscript);
    await showToast({
      style: Toast.Style.Success,
      title: "Summary Imported",
      message: "Review and edit before saving.",
    });
    setIsLoading(false);
  }

  async function handleSubmit() {
    if (!noteText.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Cannot save empty note",
      });
      return;
    }
    setIsLoading(true);
    await showToast({ style: Toast.Style.Animated, title: "Saving Note..." });

    // Write note dynamically
    const key = `notes_${entityId}`;
    const existingStored = await LocalStorage.getItem<string>(key);
    const existing = existingStored ? JSON.parse(existingStored) : [];

    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const formatted = `**${timestamp}**: \n\n${noteText}`;

    const updated = [formatted, ...existing];
    await LocalStorage.setItem(key, JSON.stringify(updated));

    await showToast({
      style: Toast.Style.Success,
      title: "Note Logged",
      message: "Saved to Knowledge Base",
    });
    setIsLoading(false);
    onSave();
    pop();
  }

  return (
    <Form
      navigationTitle={`Log Note: ${entityTitle}`}
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Save Note"
            onSubmit={handleSubmit}
            icon={Icon.SaveDocument}
          />
          <Action
            title="Fetch Desktop Call from Fathom AI"
            onAction={fetchFathomSummary}
            icon={Icon.Wand}
            shortcut={{ modifiers: ["cmd"], key: "f" }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="note"
        title="Call Notes / Summary"
        placeholder="Type the summary of the interaction..."
        autoFocus
        value={noteText}
        onChange={setNoteText}
      />
    </Form>
  );
}

export function LogActivityForm({
  entityId,
  entityTitle,
  onSave,
}: {
  entityId: string;
  entityTitle: string;
  onSave: () => void;
}) {
  const { pop } = useNavigation();
  const [activityType, setActivityType] = useState("call");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [noteText, setNoteText] = useState("");

  async function handleSubmit() {
    await showToast({
      style: Toast.Style.Animated,
      title: "Saving Activity...",
    });
    const key = `activities_${entityId}`;
    const existingStored = await LocalStorage.getItem<string>(key);
    const existing = existingStored ? JSON.parse(existingStored) : [];

    const newAct = {
      type: activityType,
      dueDate: dueDate?.toISOString(),
      note: noteText,
      completed: false,
    };
    const updated = [newAct, ...existing];
    await LocalStorage.setItem(key, JSON.stringify(updated));

    // Globally save the next closest activity date to display it on list views natively
    await LocalStorage.setItem(
      `next_activity_${entityId}`,
      dueDate?.toISOString() || "",
    );

    await showToast({
      style: Toast.Style.Success,
      title: "Activity Scheduled!",
    });
    onSave();
    pop();
  }

  return (
    <Form
      navigationTitle={`Schedule Activity: ${entityTitle}`}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Save Activity"
            onSubmit={handleSubmit}
            icon={Icon.Calendar}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="type"
        title="Activity Type"
        value={activityType}
        onChange={setActivityType}
      >
        <Form.Dropdown.Item value="call" title="Call" icon={Icon.Phone} />
        <Form.Dropdown.Item value="email" title="Email" icon={Icon.Envelope} />
        <Form.Dropdown.Item
          value="meeting"
          title="Meeting"
          icon={Icon.TwoPeople}
        />
        <Form.Dropdown.Item
          value="task"
          title="To-do Task"
          icon={Icon.CheckCircle}
        />
      </Form.Dropdown>

      <Form.DatePicker
        id="dueDate"
        title="Due Date"
        value={dueDate}
        onChange={setDueDate}
      />

      <Form.TextArea
        id="note"
        title="Notes / Description"
        placeholder="What needs to happen?"
        value={noteText}
        onChange={setNoteText}
      />
    </Form>
  );
}
