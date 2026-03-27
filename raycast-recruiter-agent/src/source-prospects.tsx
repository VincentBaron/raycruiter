import React, { useState } from "react";
import { List, ActionPanel, Action, Icon, Color, showToast, Toast, useNavigation, LocalStorage } from "@raycast/api";
import fs from "fs";
import path from "path";
import PowerDialer from "./power-dialer";
import { LogNoteForm, LogActivityForm } from "./deal-components";

// We dynamically pull the huge dummy dataset from disk locally, simulating a Mantiks API network call.
const rawMantiksPayload = JSON.parse(fs.readFileSync("/Users/vincentbaron/raycruiter/raycast-recruiter-agent/mantiks_payload.json", "utf8"));

interface MantiksLead {
  company_name: string;
  job_offer_title: string;
  lead_first_name: string;
  lead_last_name: string;
  lead_job_title: string;
  lead_email: string;
  lead_linkedin: string;
  lead_icebreaker: string;
}

const DUMMY_STAGES = [
  "New Lead",
  "Contacted",
  "In Discussion",
  "Interviewing",
  "Offer Sent",
  "Hired",
  "Rejected"
];

export default function SourceProspects() {
  const { push } = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState<string>("all");
  const [isSyncing, setIsSyncing] = useState(false);

  const leads = rawMantiksPayload.leads as MantiksLead[];

  const filteredLeads = leads.filter((lead) => {
    // We mock pipelines randomly since dummy data has no pipeline_id
    const charCode = lead.company_name.charCodeAt(0);
    const mockPipelineId = charCode % 2 === 0 ? "1" : "2";
    if (selectedPipeline !== "all" && selectedPipeline !== mockPipelineId) {
      return false;
    }

    const term = searchText.toLowerCase();
    return (
      (lead.lead_first_name || "").toLowerCase().includes(term) ||
      (lead.lead_last_name || "").toLowerCase().includes(term) ||
      (lead.company_name || "").toLowerCase().includes(term) ||
      (lead.job_offer_title || "").toLowerCase().includes(term)
    );
  });

  async function pushToPipedrive(lead: MantiksLead, stage: string) {
    setIsSyncing(true);
    await showToast({ style: Toast.Style.Animated, title: "Syncing to Pipedrive..." });

    // In production, we'd hit LocalStorage.getItem("PIPEDRIVE_API_KEY") 
    // and make a Native fetch() to POST /v1/persons
    // Simulate API Call bridging Deal -> ATS Job
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate Prospect -> Pipedrive Sync by cloning LocalStorage notes & activities into random Deal ID
    const newDealId = Math.floor(Math.random() * 10000);
    const prospectEmail = lead.lead_email;
    
    const pNotes = await LocalStorage.getItem<string>(`notes_prospect_${prospectEmail}`);
    if (pNotes) await LocalStorage.setItem(`notes_deal_${newDealId}`, pNotes);
    
    const pActs = await LocalStorage.getItem<string>(`activities_prospect_${prospectEmail}`);
    if (pActs) await LocalStorage.setItem(`activities_deal_${newDealId}`, pActs);

    await showToast({ 
      style: Toast.Style.Success, 
      title: "Person Created in Pipedrive!", 
      message: `${lead.lead_first_name} tagged as ${stage} (ID: ${newDealId}) with synced activities.` 
    });
    setIsSyncing(false);
  }

  async function pushAndDial(lead: MantiksLead) {
    setIsSyncing(true);
    await showToast({ style: Toast.Style.Animated, title: "Creating Person..." });
    await new Promise((resolve) => setTimeout(resolve, 800));
    await showToast({ style: Toast.Style.Success, title: "Person Created! Jumping to Dialer..." });
    setIsSyncing(false);

    const fullName = `${lead.lead_first_name} ${lead.lead_last_name}`;
    const injected = {
      name: fullName,
      email: [{ value: lead.lead_email, primary: true }],
      phone: [],
      associatedDeal: `${lead.company_name} - Sourced Prospect`,
      dealValue: 0,
      originalDeal: {
        id: Math.floor(Math.random() * 10000),
        title: `${lead.company_name} - Sourced Prospect`,
        status: "Open",
        pipeline_id: 1,
        stage_id: 1,
      }
    };

    push(<PowerDialer initialSearchText={fullName} injectedPerson={injected} />);
  }

  return (
    <List
      isLoading={isSyncing}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder={`Search ${leads.length} prospects...`}
      navigationTitle="Prospects Pipelines"
      searchBarAccessory={
        <List.Dropdown tooltip="Select Prospect Sourcing Pipeline" value={selectedPipeline} onChange={setSelectedPipeline}>
          <List.Dropdown.Item title="All Sourced Pipelines" value="all" icon={Icon.List} />
          <List.Dropdown.Item title="Tech Sourcing - June" value="1" icon={Icon.Terminal} />
          <List.Dropdown.Item title="Sales Sourcing EMEA" value="2" icon={Icon.Globe} />
        </List.Dropdown>
      }
    >
      <List.Section title={`Active Prospects Pipeline`}>
        {filteredLeads.map((lead, index) => {
          const fullName = `${lead.lead_first_name} ${lead.lead_last_name}`;

          return (
            <List.Item
              key={index}
              icon={{ source: Icon.Person, tintColor: Color.Blue }}
              title={fullName}
              subtitle={`${lead.lead_job_title} @ ${lead.company_name}`}
              accessories={[
                { text: lead.job_offer_title, icon: Icon.MagnifyingGlass },
              ]}
              actions={
                <ActionPanel>
                  <ActionPanel.Submenu 
                    title="Push to Deals Pipeline..." 
                    icon={Icon.Upload} 
                    shortcut={{ modifiers: ["cmd"], key: "s" }}
                  >
                    {DUMMY_STAGES.map((stage) => (
                      <Action 
                        key={stage} 
                        title={`Create Person & Tag as '${stage}'`} 
                        icon={Icon.Tag}
                        onAction={() => pushToPipedrive(lead, stage)} 
                      />
                    ))}
                  </ActionPanel.Submenu>
                  <Action 
                    title="Create Person & Power Dial" 
                    icon={Icon.Phone} 
                    shortcut={{ modifiers: ["cmd"], key: "t" }} 
                    onAction={() => pushAndDial(lead)} 
                  />
                  <ActionPanel.Section title="Prospect Activity">
                    <Action
                      title="Log Call / Note"
                      icon={Icon.Pencil}
                      shortcut={{ modifiers: ["cmd"], key: "n" }}
                      onAction={() => push(<LogNoteForm entityId={`prospect_${lead.lead_email}`} entityTitle={fullName} onSave={() => {}} />)}
                    />
                    <Action
                      title="Schedule Next Activity"
                      icon={Icon.Calendar}
                      shortcut={{ modifiers: ["cmd", "shift"], key: "a" }}
                      onAction={() => push(<LogActivityForm entityId={`prospect_${lead.lead_email}`} entityTitle={fullName} onSave={() => {}} />)}
                    />
                  </ActionPanel.Section>

                  <ActionPanel.Section title="Outreach Prep">
                    <Action.CopyToClipboard 
                      title="Copy Sourced Gen-AI Icebreaker" 
                      content={lead.lead_icebreaker || "No icebreaker found."} 
                      shortcut={{ modifiers: ["cmd"], key: "c" }}
                    />
                    <Action.CopyToClipboard 
                      title="Copy Email" 
                      content={lead.lead_email} 
                    />
                  </ActionPanel.Section>

                  <ActionPanel.Section title="Links">
                    {lead.lead_linkedin && (
                      <Action.OpenInBrowser
                        title="Open LinkedIn Profile"
                        url={lead.lead_linkedin}
                        shortcut={{ modifiers: ["cmd"], key: "l" }}
                      />
                    )}
                  </ActionPanel.Section>
                </ActionPanel>
              }
            />
          );
        })}
      </List.Section>
    </List>
  );
}
