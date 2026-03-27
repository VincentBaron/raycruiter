import React, { useState } from "react";
import { Action, ActionPanel, Icon, useNavigation, Form, showToast, Toast } from "@raycast/api";
import { useMockData } from "../../hooks/useMockData";
import { EntityDetail } from "../../views/EntityDetail";

function CreateJobForm({ dealId }: { dealId: string }) {
  const { pop } = useNavigation();
  const { jobs, setJobs } = useMockData();

  const handleSubmit = async (values: any) => {
    const newJob = {
      id: `job-${Date.now()}`,
      dealId,
      title: values.title,
      description: values.description,
      status: "open",
      location: "Remote",
      salary: values.salary,
      multiDiffusion: []
    };
    setJobs([newJob, ...jobs]);
    await showToast({ style: Toast.Style.Success, title: "Job Created", message: `For deal ${dealId}` });
    pop();
  };

  return (
    <Form
      navigationTitle="Create Job"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Job" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Job Title" placeholder="e.g. Lead Engineer" autoFocus />
      <Form.TextField id="salary" title="Salary Range" placeholder="e.g. $100k - $120k" />
      <Form.TextArea 
        id="description" 
        title="Job Description" 
        defaultValue="[AI Generated Profile]\nWe are looking for a highly skilled individual with 5+ years of experience in the required modern tech stacks. You will be responsible for scaling infrastructure and driving high priority initiatives across cross-functional teams."
      />
    </Form>
  );
}

export function DealActions({ deal }: { deal: any }) {
  const { deals, setDeals } = useMockData();

  const assignMember = async (memberName: string) => {
    const updated = deals.map(d => d.id === deal.id ? { ...d, assignee: memberName } : d);
    setDeals(updated);
    await showToast({ style: Toast.Style.Success, title: `Assigned to ${memberName}` });
  };

  const changeStatus = async () => {
    const nextStatus = deal.status === "open" ? "won" : deal.status === "won" ? "lost" : "open";
    const updated = deals.map(d => d.id === deal.id ? { ...d, status: nextStatus } : d);
    setDeals(updated);
    await showToast({ style: Toast.Style.Success, title: `Deal Status: ${nextStatus.toUpperCase()}` });
  };

  const deleteDeal = async () => {
    setDeals(deals.filter(d => d.id !== deal.id));
    await showToast({ style: Toast.Style.Success, title: "Deal Deleted" });
  };

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.Push title="Open Details" icon={Icon.Sidebar} target={<EntityDetail type="Deal" data={deal} />} />
        <Action.Push title="Create Job" icon={Icon.Plus} target={<CreateJobForm dealId={deal.id} />} shortcut={{ modifiers: ["cmd"], key: "n" }} />
        
        <ActionPanel.Submenu title="Assign Member" icon={Icon.Person} shortcut={{ modifiers: ["cmd", "shift"], key: "a" }}>
          <Action title="Jane Doe" onAction={() => assignMember("Jane Doe")} />
          <Action title="John Smith" onAction={() => assignMember("John Smith")} />
          <Action title="Alex Recruiter" onAction={() => assignMember("Alex Recruiter")} />
        </ActionPanel.Submenu>

        <Action title="Change Status" icon={Icon.ChevronUp} onAction={changeStatus} shortcut={{ modifiers: ["cmd", "shift"], key: "s" }} />
        <Action title="Edit Deal" icon={Icon.Pencil} onAction={() => showToast({title:"Opening Edit Form"})} shortcut={{ modifiers: ["cmd"], key: "e" }} />
      </ActionPanel.Section>
      <ActionPanel.Section>
        <Action.CopyToClipboard title="Copy ID" content={deal.id} />
        <Action title="Delete Deal" icon={Icon.Trash} style={Action.Style.Destructive} onAction={deleteDeal} shortcut={{ modifiers: ["ctrl"], key: "x" }} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
