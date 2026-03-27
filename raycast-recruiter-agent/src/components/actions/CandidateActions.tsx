import React from "react";
import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { useMockData } from "../../hooks/useMockData";
import { EntityDetail } from "../../views/EntityDetail";

export function CandidateActions({ candidate }: { candidate: any }) {
  const { candidates, setCandidates } = useMockData();

  const changeStage = async () => {
    const stages = ["applied", "screening", "interview", "offer", "hired"];
    const currentIdx = stages.indexOf(candidate.stage);
    const nextStage = stages[(currentIdx + 1) % stages.length];
    const updated = candidates.map(c => c.id === candidate.id ? { ...c, stage: nextStage } : c);
    setCandidates(updated);
    await showToast({ style: Toast.Style.Success, title: `Stage: ${nextStage.toUpperCase()}` });
  };

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.Push title="Open Details" icon={Icon.Sidebar} target={<EntityDetail type="Candidate" data={candidate} />} />
        <Action title="Change Stage" icon={Icon.AppWindowList} onAction={changeStage} shortcut={{ modifiers: ["cmd", "shift"], key: "s" }} />
        <Action title="Add Review" icon={Icon.Document} onAction={() => showToast({title:"Opening Review Form"})} shortcut={{ modifiers: ["cmd"], key: "n" }} />
        <Action title="Edit Candidate" icon={Icon.Pencil} onAction={() => showToast({title:"Opening Edit Form"})} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        {candidate.email && <Action.CopyToClipboard title="Copy Email" content={candidate.email} />}
        <Action.CopyToClipboard title="Copy ID" content={candidate.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
