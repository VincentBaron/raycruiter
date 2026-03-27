import { Action, ActionPanel, Icon } from "@raycast/api";

export function ProspectActions({ prospect }: { prospect: any }) {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action title="Convert to Client" icon={Icon.PersonCircle} onAction={() => console.log("Convert to Client/Deal", prospect.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} />
        <Action title="Send Call Recap" icon={Icon.Envelope} onAction={() => console.log("Trigger AI Recap", prospect.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "r" }} />
        <Action title="Add Note" icon={Icon.Document} onAction={() => console.log("Add Note", prospect.id)} shortcut={{ modifiers: ["cmd"], key: "n" }} />
        <Action title="Edit Prospect" icon={Icon.Pencil} onAction={() => console.log("Edit Prospect", prospect.id)} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        {prospect.email && <Action.CopyToClipboard title="Copy Email" content={prospect.email} />}
        <Action.CopyToClipboard title="Copy ID" content={prospect.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
