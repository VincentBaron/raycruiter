import React, { useState } from "react";
import { List, ActionPanel, Action, Icon, Color, useNavigation } from "@raycast/api";

const jemmoPayload = require("../../jemmo_payload.json");
const activeJobsData = require("../../active_jobs.json");

const fakeStages = [
  { id: "s1", name: "Sourced", color: Color.SecondaryText },
  { id: "s2", name: "First Interview", color: Color.Blue },
  { id: "s3", name: "Technical Test", color: Color.Orange },
  { id: "s4", name: "Offer Extended", color: Color.Green }
];

// Removed JobPipeline component in favor of unified Deals Pipeline.

export default function JobsCommand() {
  const { push } = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState<string>("active");

  const actualJobs = activeJobsData.items.map((item: any, index: number) => {
    // Generate a deterministic fake activity date for visual testing parity
    const today = new Date();
    const fakeDates = [
      new Date(today.getTime() - 86400000 * 2), // Past Due (2 days ago)
      new Date(), // Due Today
      new Date(today.getTime() + 86400000 * 5), // In 5 days
      null // No activity
    ];
    const fakeActivityDate = fakeDates[index % fakeDates.length];

    return {
      id: item.vacancy.id,
      title: item.vacancy.title,
      location: item.vacancy.addressFormatted || item.vacancy.address?.locality || "Remote",
      type: item.vacancy.contract_type || "N/A",
      posted: new Date(item.vacancy.created_at).toLocaleDateString(),
      next_activity_date: fakeActivityDate?.toISOString() || null
    };
  });

  const filteredJobs = actualJobs.filter((j: any) => {
    // Filter mocked jobs based on toggle status (Active vs Draft vs Closed)
    const charSum = j.title.charCodeAt(0) + j.title.charCodeAt(j.title.length - 1);
    let status = "active";
    if (charSum % 5 === 0) status = "closed";
    else if (charSum % 7 === 0) status = "draft";
    
    if (selectedPipeline !== "all" && status !== selectedPipeline) return false;
    
    return j.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <List 
      navigationTitle="Open Vacancies"
      searchBarPlaceholder="Search by job title..."
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown tooltip="Select Job Pipeline" value={selectedPipeline} onChange={setSelectedPipeline}>
          <List.Dropdown.Item title="All Vacancies" value="all" icon={Icon.List} />
          <List.Dropdown.Item title="Active Pipeline" value="active" icon={Icon.Play} />
          <List.Dropdown.Item title="Drafts / Pending" value="draft" icon={Icon.Document} />
          <List.Dropdown.Item title="Closed" value="closed" icon={Icon.Box} />
        </List.Dropdown>
      }
    >
      {filteredJobs.map((job: any) => {
        const accessories: List.Item.Accessory[] = [];

        if (job.next_activity_date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const activityDate = new Date(job.next_activity_date);
          activityDate.setHours(0, 0, 0, 0);

          const diffTime = activityDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          let icon: Icon = Icon.Calendar;
          let color: Color = Color.PrimaryText;
          let text = "Task";
          
          if (diffDays < 0) {
            text = "Overdue";
            icon = Icon.Warning;
            color = Color.Red;
          } else if (diffDays === 0) {
            text = "Due Today";
            icon = Icon.Clock;
            color = Color.Orange;
          } else {
            text = `In ${diffDays}d`;
            icon = Icon.Calendar;
            color = Color.Green;
          }

          accessories.push({
             text: text,
             icon: { source: icon, tintColor: color },
             tooltip: `Next Task: ${activityDate.toLocaleDateString()}`
          });
        } else {
           accessories.push({
             text: "No Tasks",
             icon: { source: Icon.MinusCircle, tintColor: Color.SecondaryText }
           });
        }

        accessories.push({ text: job.posted, icon: Icon.Calendar });

        return (
          <List.Item
            key={job.id}
            title={`${job.title} — ${job.location} • ${job.type}`}
            icon={Icon.Building}
            accessories={accessories}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy Job Link" content={`https://raycruiter.app/jobs/${job.id}`} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
