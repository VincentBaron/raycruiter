import React from "react";
import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { useMockData } from "../../hooks/useMockData";
import { EntityDetail } from "../../views/EntityDetail";

export function ProspectActions({ prospect }: { prospect: any }) {
  const { deals, setDeals, prospects, setProspects } = useMockData();

  const convertToDeal = async () => {
    const updatedProspects = prospects.filter((p: any) => p.id !== prospect.id);
    setProspects(updatedProspects);

    const newDeal = {
      id: `deal-${Date.now()}`,
      name: `${prospect.company} Ongoing Search`,
      status: "open",
      clientName: prospect.company,
      assignee: "Jane Doe",
      createdAt: new Date().toISOString()
    };
    setDeals([newDeal, ...deals]);

    await showToast({ style: Toast.Style.Success, title: "Converted to Client", message: "New Deal created!" });
  };

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.Push title="Open Details" icon={Icon.Sidebar} target={<EntityDetail type="Prospect" data={prospect} />} />
        <Action title="Convert to Client" icon={Icon.PersonCircle} onAction={convertToDeal} shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} />
        <Action title="Send Call Recap" icon={Icon.Envelope} onAction={() => showToast({title: "Recap Generated via AI"})} shortcut={{ modifiers: ["cmd", "shift"], key: "r" }} />
        <Action title="Add Note" icon={Icon.Document} onAction={() => showToast({title:"Add Note"})} shortcut={{ modifiers: ["cmd"], key: "n" }} />
        <Action title="Edit Prospect" icon={Icon.Pencil} onAction={() => showToast({title:"Edit Form"})} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        {prospect.email && <Action.CopyToClipboard title="Copy Email" content={prospect.email} />}
        <Action.CopyToClipboard title="Copy ID" content={prospect.id} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
