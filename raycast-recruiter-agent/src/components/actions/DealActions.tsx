import { Action, ActionPanel, Icon } from "@raycast/api";

export function DealActions({ deal }: { deal: any }) {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action title="Edit Deal" icon={Icon.Pencil} onAction={() => console.log("Edit Deal", deal.id)} shortcut={{ modifiers: ["cmd"], key: "e" }} />
        <Action title="Change Status" icon={Icon.ChevronUp} onAction={() => console.log("Change Status", deal.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "s" }} />
        <Action title="Assign Member" icon={Icon.Person} onAction={() => console.log("Assign Member", deal.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "a" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.CopyToClipboard title="Copy ID" content={deal.id} />
        <Action title="Delete Deal" icon={Icon.Trash} style={Action.Style.Destructive} onAction={() => console.log("Delete Deal", deal.id)} shortcut={{ modifiers: ["ctrl"], key: "x" }} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
