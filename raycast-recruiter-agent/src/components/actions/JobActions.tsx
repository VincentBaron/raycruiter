import React from "react";
import { Action, ActionPanel, Icon, useNavigation, showToast, Toast } from "@raycast/api";
import { useMockData } from "../../hooks/useMockData";
import { EntityList } from "../../views/EntityList";
import { EntityDetail } from "../../views/EntityDetail";

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
  const { prospects, setProspects } = useMockData();

  const sourceCandidates = async () => {
    const newProspect = { id: `pro-ai-${Date.now()}`, name: "Sourced AI Lead", company: "Rival Corp", signalStrength: "high" };
    setProspects([newProspect, ...prospects]);
    await showToast({ style: Toast.Style.Success, title: "Sourced 1 Candidate via Jemmo AI" });
  };

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.Push title="Open Details" icon={Icon.Sidebar} target={<EntityDetail type="Job" data={job} />} />
        <Action.Push title="View Applicants" icon={Icon.TwoPeople} target={<ViewApplicantsList jobId={job.id} />} shortcut={{ modifiers: ["cmd", "shift"], key: "v" }} />
        <Action title="Source Candidates" icon={Icon.MagnifyingGlass} onAction={sourceCandidates} shortcut={{ modifiers: ["cmd", "shift"], key: "g" }} />
        <Action title="Toggle Multi-Diffusion" icon={Icon.ArrowNe} onAction={() => showToast({title:"Multi-Diffusion Toggled"})} shortcut={{ modifiers: ["cmd", "shift"], key: "m" }} />
        <Action title="Edit Job" icon={Icon.Pencil} onAction={() => showToast({title:"Opening Edit Form"})} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.CopyToClipboard title="Copy ID" content={job.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
