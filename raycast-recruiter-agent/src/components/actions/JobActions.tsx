import React from "react";
import { Action, ActionPanel, Icon, useNavigation } from "@raycast/api";
import { useMockData } from "../../hooks/useMockData";
import { EntityList } from "../../views/EntityList";

function ViewApplicantsList({ jobId }: { jobId: string }) {
  const { candidates } = useMockData();
  const applicants = candidates.filter(c => c.jobId === jobId);

  return (
    <EntityList
      isLoading={false}
      deals={[]} jobs={[]} prospects={[]} candidates={applicants}
      navigationTitle="Applicants"
    />
  );
}

export function JobActions({ job }: { job: any }) {
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action title="Source Candidates" icon={Icon.MagnifyingGlass} onAction={() => console.log("Source via Jemmo API", job.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "g" }} />
        <Action.Push title="View Applicants" icon={Icon.TwoPeople} target={<ViewApplicantsList jobId={job.id} />} shortcut={{ modifiers: ["cmd", "shift"], key: "v" }} />
        <Action title="Toggle Multi-Diffusion" icon={Icon.ArrowNe} onAction={() => console.log("Toggle Boards", job.id)} shortcut={{ modifiers: ["cmd", "shift"], key: "m" }} />
        <Action title="Edit Job" icon={Icon.Pencil} onAction={() => console.log("Edit Job", job.id)} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.CopyToClipboard title="Copy ID" content={job.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
