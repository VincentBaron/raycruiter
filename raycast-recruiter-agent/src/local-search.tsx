import React, { useState, useMemo } from "react";
import { List, Icon, Color, ActionPanel, Action, useNavigation } from "@raycast/api";

import fs from "fs";
import path from "path";

const rawDeals = JSON.parse(fs.readFileSync("/Users/vincentbaron/raycruiter/raycast-recruiter-agent/src/deals.json", "utf8"));
const rawMantiksPayload = JSON.parse(fs.readFileSync("/Users/vincentbaron/raycruiter/raycast-recruiter-agent/mantiks_payload.json", "utf8"));

interface Deal {
  id: string;
  title: string;
  status: string;
  value: number;
  date: string;
  website?: string | null;
  linkedin?: string | null;
  person_id?: {
    name: string;
    email: { value: string }[];
    phone?: { value: string }[];
  };
}

interface MantiksLead {
  company_id: string;
  company_name: string;
  company_sectors: string;
  company_size: string;
  hq_location: string;
  company_website: string;
  company_linkedin: string;
  lead_first_name: string;
  lead_last_name: string;
  lead_job_title: string;
  lead_email: string;
  lead_linkedin: string;
  lead_icebreaker: string;
  job_offer_title: string;
}

interface Organisation {
  id: string;
  name: string;
  website?: string;
  linkedin?: string;
  source: "deal" | "mantiks";
  sector?: string;
  location?: string;
  size?: string;
}

export default function SearchDatabases() {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<"all" | "deals" | "prospects" | "organisations">("all");

  const deals = rawDeals as Deal[];
  const leads = rawMantiksPayload.leads as MantiksLead[];

  // Derive Organisations
  const organisations = useMemo(() => {
    const orgMap = new Map<string, Organisation>();

    // From Mantiks
    leads.forEach(lead => {
      const name = lead.company_name?.trim();
      if (name && !orgMap.has(name.toLowerCase())) {
        orgMap.set(name.toLowerCase(), {
          id: lead.company_id || `org-${name}`,
          name: name,
          website: lead.company_website,
          linkedin: lead.company_linkedin,
          source: "mantiks",
          sector: lead.company_sectors,
          location: lead.hq_location,
          size: lead.company_size
        });
      }
    });

    // From Deals
    deals.forEach(deal => {
      let name = deal.title.replace(/^Affaire\s+/i, "").trim();
      if (name && !orgMap.has(name.toLowerCase())) {
        orgMap.set(name.toLowerCase(), {
          id: `org-deal-${deal.id}`,
          name: name,
          website: deal.website || undefined,
          linkedin: deal.linkedin || undefined,
          source: "deal"
        });
      }
    });

    return Array.from(orgMap.values());
  }, [deals, leads]);

  const searchWords = searchText.toLowerCase().split(/\s+/).filter(Boolean);

  const filterItem = (textStr: string) => {
    if (searchWords.length === 0) return true;
    const lower = textStr.toLowerCase();
    return searchWords.every(word => lower.includes(word));
  };

  const filteredDeals = useMemo(() => {
    if (filterType !== "all" && filterType !== "deals") return [];
    return deals.filter(d => filterItem(`${d.id} ${d.title} ${d.website || ""} ${d.person_id?.name || ""}`));
  }, [deals, filterType, searchWords]);

  const filteredLeads = useMemo(() => {
    if (filterType !== "all" && filterType !== "prospects") return [];
    return leads.filter(l => filterItem(`${l.company_name} ${l.lead_first_name} ${l.lead_last_name} ${l.lead_email} ${l.lead_job_title}`));
  }, [leads, filterType, searchWords]);

  const filteredOrgs = useMemo(() => {
    if (filterType !== "all" && filterType !== "organisations") return [];
    return organisations.filter(o => filterItem(`${o.id} ${o.name} ${o.website || ""} ${o.sector || ""}`));
  }, [organisations, filterType, searchWords]);

  return (
    <List
      navigationTitle="Search Databases"
      searchBarPlaceholder="Search directly by keywords, ids, emails..."
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown tooltip="Filter Database" onChange={(id) => setFilterType(id as any)} defaultValue="all">
          <List.Dropdown.Item title="All Databases" value="all" />
          <List.Dropdown.Item title="Organisations" value="organisations" />
          <List.Dropdown.Item title="Deals" value="deals" />
          <List.Dropdown.Item title="Prospects" value="prospects" />
        </List.Dropdown>
      }
      isShowingDetail={filterType === "organisations"}
    >
      {(filterType === "all" || filterType === "organisations") && (
        <List.Section title={`Organisations (${filteredOrgs.length})`}>
          {filteredOrgs.map(org => (
            <List.Item
              key={`org-${org.id}`}
              icon={{ source: Icon.Building, tintColor: Color.Purple }}
              title={org.name}
              subtitle={filterType === "organisations" ? "" : org.website || org.sector}
              accessories={filterType === "organisations" ? [] : [{ text: "Organisation" }]}
              detail={
                <List.Item.Detail
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.Label title="Name" text={org.name} />
                      <List.Item.Detail.Metadata.Label title="ID" text={org.id} />
                      {org.website && <List.Item.Detail.Metadata.Link title="Website" target={org.website} text={org.website} />}
                      {org.linkedin && <List.Item.Detail.Metadata.Link title="LinkedIn" target={org.linkedin} text={org.linkedin} />}
                      {org.sector && <List.Item.Detail.Metadata.Label title="Sector" text={org.sector} />}
                      {org.size && <List.Item.Detail.Metadata.Label title="Size" text={org.size} />}
                      {org.location && <List.Item.Detail.Metadata.Label title="HQ Location" text={org.location} />}
                      <List.Item.Detail.Metadata.TagList title="Source">
                        <List.Item.Detail.Metadata.TagList.Item
                          text={org.source.toUpperCase()}
                          color={org.source === "mantiks" ? Color.Blue : Color.Green}
                        />
                      </List.Item.Detail.Metadata.TagList>
                    </List.Item.Detail.Metadata>
                  }
                />
              }
              actions={
                <ActionPanel>
                  {org.website && <Action.OpenInBrowser title="Open Website" url={org.website.startsWith('http') ? org.website : `https://${org.website}`} />}
                  {org.linkedin && <Action.OpenInBrowser title="Open LinkedIn" url={org.linkedin} />}
                  <Action.CopyToClipboard title="Copy Organisation Name" content={org.name} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      {(filterType === "all" || filterType === "deals") && (
        <List.Section title={`Deals (${filteredDeals.length})`}>
          {filteredDeals.map(deal => (
            <List.Item
              key={`deal-${deal.id}`}
              icon={{ source: Icon.BankNote, tintColor: Color.Green }}
              title={deal.title}
              subtitle={deal.person_id?.name || deal.website || ""}
              accessories={[
                { text: `ID: ${deal.id}`, icon: Icon.Hashtag },
                { text: "Deal" }
              ]}
              actions={
                <ActionPanel>
                  <Action.CopyToClipboard title="Copy Deal ID" content={deal.id} />
                  {deal.website && <Action.OpenInBrowser title="Open Website" url={deal.website.startsWith('http') ? deal.website : `https://${deal.website}`} />}
                  {deal.person_id?.email?.[0]?.value && <Action.CopyToClipboard title="Copy Email" content={deal.person_id.email[0].value} />}
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      {(filterType === "all" || filterType === "prospects") && (
        <List.Section title={`Prospects & Leads (${filteredLeads.length})`}>
          {filteredLeads.map((lead, idx) => (
            <List.Item
              key={`lead-${lead.lead_email || idx}-${idx}`}
              icon={{ source: Icon.Person, tintColor: Color.Blue }}
              title={`${lead.lead_first_name || ""} ${lead.lead_last_name || ""}`.trim() || lead.lead_email}
              subtitle={`${lead.lead_job_title || ""} @ ${lead.company_name || ""}`}
              accessories={[
                { text: "Prospect" }
              ]}
              actions={
                <ActionPanel>
                  <Action.CopyToClipboard title="Copy Email" content={lead.lead_email} />
                  {lead.lead_linkedin && <Action.OpenInBrowser title="Open LinkedIn" url={lead.lead_linkedin} />}
                  <Action.CopyToClipboard title="Copy Icebreaker" content={lead.lead_icebreaker} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}
    </List>
  );
}
