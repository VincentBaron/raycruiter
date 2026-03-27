import { Action, ActionPanel, Icon } from "@raycast/api";

export function CandidateActions({ candidate }: { candidate: any }) {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action title="Change Stage" icon={Icon.AppWindowList} onAction={() => console.log("Change Stage", candidate.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "s" }} />
        <Action title="Add Review" icon={Icon.Document} onAction={() => console.log("Add Review", candidate.id)} shortcut={{ modifiers: ["cmd"], key: "n" }} />
        <Action title="Edit Candidate" icon={Icon.Pencil} onAction={() => console.log("Edit Candidate", candidate.id)} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        {candidate.email && <Action.CopyToClipboard title="Copy Email" content={candidate.email} />}
        <Action.CopyToClipboard title="Copy ID" content={candidate.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
