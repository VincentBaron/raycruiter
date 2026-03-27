import { Action, ActionPanel, Icon } from "@raycast/api";

export function JobActions({ job }: { job: any }) {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action title="Source Candidates" icon={Icon.MagnifyingGlass} onAction={() => console.log("Source via Jemmo API", job.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "g" }} />
        <Action title="View Applicants" icon={Icon.TwoPeople} onAction={() => console.log("View Applicants", job.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "v" }} />
        <Action title="Toggle Multi-Diffusion" icon={Icon.ArrowNe} onAction={() => console.log("Toggle Boards", job.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "m" }} />
        <Action title="Edit Job" icon={Icon.Pencil} onAction={() => console.log("Edit Job", job.id)} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.CopyToClipboard title="Copy ID" content={job.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
