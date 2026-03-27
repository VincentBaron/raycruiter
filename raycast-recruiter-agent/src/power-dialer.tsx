import React, { useState, useMemo } from "react";
import { List, ActionPanel, Action, Icon, Color, useNavigation, LocalStorage } from "@raycast/api";
import fs from "fs";
import path from "path";
import { LogNoteForm, LogActivityForm } from "./deal-components";
import MatchCandidates from "./match-candidates";

type Deal = {
  id: number;
  title: string;
  value: number;
  person_id?: {
    name: string;
    email?: { value: string; primary: boolean }[];
    phone?: { value: string; primary: boolean }[];
  } | null;
  org_id?: { name: string } | null;
  pipeline_id: number;
  stage_id: number;
  website?: string | null;
  linkedin?: string | null;
};

export default function PowerDialer({ initialSearchText = "", injectedPerson }: { initialSearchText?: string, injectedPerson?: any }) {
  const { push } = useNavigation();
  const [searchText, setSearchText] = useState(initialSearchText);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!initialSearchText) {
      LocalStorage.getItem<string>("power_dialer_search").then(v => { if (v) setSearchText(v); });
    }
    LocalStorage.getItem<string>("power_dialer_selection").then(v => { if (v) setSelectedId(v); });
  }, [initialSearchText]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    LocalStorage.setItem("power_dialer_search", text);
  };

  const handleSelection = (id: string | null) => {
    if (id) {
      setSelectedId(id);
      LocalStorage.setItem("power_dialer_selection", id);
    }
  };
  const dealsData: Deal[] = JSON.parse(fs.readFileSync("/Users/vincentbaron/raycruiter/raycast-recruiter-agent/src/deals.json", "utf8"));

  // Extract unique people from deals
  const people = useMemo(() => {
    const unique = new Map();
    const signals = [
      "Watched webinar: AI in Recruitment 2026",
      "Downloaded eBook: State of Startup Hiring",
      "Visited pricing page 3 times today",
      "Opened your last email 4 times",
      "Requested a demo yesterday",
      "Read case study: How CompanyX scaled by 300%",
      "Attended regional HR Leaders summit last month",
      "Recently raised Series B funding",
      "Hired 5 engineers in the last 2 weeks",
      "Competitor contract expiring in 30 days"
    ];

    dealsData.forEach((d, index) => {
      if (d.person_id && d.person_id.name) {
        if (!unique.has(d.person_id.name)) {
          // Fake deal value (5000 to 50000, snap to 1000s)
          const randomValue = (Math.floor(Math.random() * 46) + 5) * 1000;
          // Assign deterministic random signal
          const signal = signals[(d.id * 10 || index) % signals.length];

          unique.set(d.person_id.name, {
            ...d.person_id,
            associatedDeal: d.title,
            dealValue: d.value ? d.value : randomValue,
            intentSignal: signal,
            originalDeal: d,
          });
        }
      }
    });
    let arr = Array.from(unique.values()).map((p, i) => ({ ...p, shortId: `p${i + 1}` }));

    // Sort logic: Sort by import_time descending (Most urgent Mantiks imports first)
    arr.sort((a, b) => {
      const timeA = a.import_time ? new Date(a.import_time).getTime() : 0;
      const timeB = b.import_time ? new Date(b.import_time).getTime() : 0;
      return timeB - timeA;
    });

    if (injectedPerson) {
      arr.unshift({ ...injectedPerson, shortId: 'p0' });
    }
    return arr;
  }, [dealsData, injectedPerson]);

  const filteredPeople = useMemo(() => {
    const term = searchText.toLowerCase();
    return people.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(term) ||
        p.shortId.includes(term) ||
        (p.associatedDeal || "").toLowerCase().includes(term)
    );
  }, [searchText, people]);

  return (
    <List
      isShowingDetail
      searchText={searchText}
      onSearchTextChange={handleSearchChange}
      selectedItemId={selectedId || undefined}
      onSelectionChange={handleSelection}
      navigationTitle="Power Dialer"
      searchBarPlaceholder="Search persons to dial (e.g. p1)..."
    >
      <List.Section title="CRM Contacts Queue" subtitle={`${filteredPeople.length} Remaining`}>
        {filteredPeople.map((person) => {
          const primaryPhone = person.phone?.find((ph: any) => ph.primary)?.value || person.phone?.[0]?.value || "No Phone";
          const primaryEmail = person.email?.find((e: any) => e.primary)?.value || person.email?.[0]?.value || "No Email";

          const hobbies = ["Marathon running", "Sailing", "Amateur photography", "Bouldering", "Gourmet cooking", "Playing guitar", "Wine tasting", "Cycling"];
          const fundingNews = [
            "Just raised $15M Series A led by Sequoia",
            "Acquired a smaller competitor last month",
            "Recently expanded operations to the US market",
            "Raised a $3M Seed round to expand the team",
            "Recently crossed $5M in ARR milestone",
            "Recently appointed a new VP of Engineering",
            "Opening a new office in London next month",
            "Featured in TechCrunch top 50 startups to watch"
          ];
          const idx = (parseInt(person.shortId.replace("p", "")) || 0) + 7; // shift seed slightly

          const companyName = person.originalDeal?.org_id?.name || person.associatedDeal.split(' ')[0] || "Company";
          let markdown = `# [${companyName}](https://linkedin.com/company/${encodeURIComponent(companyName.toLowerCase().replace(/\\s+/g, '-'))})\n\n`;

          if (person.imported_from === "mantiks") {
            markdown += `### 🎯 Mantiks Original Job Context\n`;
            markdown += `> Extracted from active vacancy posting.\n\n`;
            markdown += `- **Target Role:** ${person.associatedDeal.replace('Affaire ', '')}\n`;
            markdown += `- **Sourcing Date:** ${new Date(person.import_time).toLocaleDateString()}\n\n`;
          }

          markdown += `### Recent Company News\n`;
          markdown += `> ${fundingNews[idx % fundingNews.length]}\n\n`;
          markdown += `### Individual Signals\n`;
          markdown += `- **Current Activity:** ${person.intentSignal}\n`;
          markdown += `- **Personal Interest:** Known to enjoy ${hobbies[idx % hobbies.length].toLowerCase()}\n`;
          markdown += `- **Recency:** Imported into urgency queue recently\n`;
          markdown += `\n---\n*\`Cmd + M\` to view Jemmo ATS Candidate Matches for this Deal.*`;

          return (
            <List.Item
              id={person.shortId}
              key={person.shortId}
              title={`[${person.shortId}] ${person.name} — ${person.associatedDeal}`}
              icon={{ source: Icon.PersonCircle, tintColor: person.imported_from === "mantiks" ? Color.Red : Color.Blue }}
              accessories={[
                person.import_time ? { text: "Urgent", icon: Icon.Clock, tooltip: "Sourced via Mantiks" } : {},
                { text: `€${person.dealValue.toLocaleString()}`, icon: Icon.BankNote },
              ]}
              detail={
                <List.Item.Detail
                  markdown={markdown}
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.Label title="Name" text={person.name} />
                      <List.Item.Detail.Metadata.Label title="Phone" text={primaryPhone} icon={Icon.Phone} />
                      <List.Item.Detail.Metadata.Label title="Email" text={primaryEmail} icon={Icon.Envelope} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Associated Deal" text={person.associatedDeal} />
                      <List.Item.Detail.Metadata.Label title="Deal Value" text={`€${person.dealValue.toLocaleString()}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Recent Intent Signal" text={person.intentSignal} icon={Icon.Binoculars} />
                    </List.Item.Detail.Metadata>
                  }
                />
              }
              actions={
                <ActionPanel>
                  <ActionPanel.Section title="Accelerators">
                    <Action
                      title="Log Call / Note"
                      icon={Icon.Pencil}
                      onAction={() => push(<LogNoteForm entityId={`deal_${person.originalDeal.id}`} entityTitle={person.originalDeal.title} onSave={() => { }} />)}
                    />
                    <Action
                      title="Schedule Activity"
                      icon={Icon.Calendar}
                      shortcut={{ modifiers: ["cmd", "shift"], key: "a" }}
                      onAction={() => push(<LogActivityForm entityId={`deal_${person.originalDeal.id}`} entityTitle={person.originalDeal.title} onSave={() => { }} />)}
                    />
                    <Action.Push
                      title="View Matched Candidates"
                      icon={Icon.Stars}
                      shortcut={{ modifiers: ["cmd"], key: "m" }}
                      target={<MatchCandidates initialJobId={person.originalDeal.id.toString()} />}
                    />
                  </ActionPanel.Section>
                  <ActionPanel.Section title="Outreach">
                    {primaryPhone !== "No Phone" && (
                      <Action.OpenInBrowser title="Power Dial (Call)" url={`tel://${primaryPhone}`} icon={Icon.Phone} />
                    )}
                    {primaryEmail !== "No Email" && (
                      <Action.OpenInBrowser title="Send Email" url={`mailto:${primaryEmail}`} icon={Icon.Envelope} />
                    )}
                  </ActionPanel.Section>
                  <ActionPanel.Section title="Copy Info">
                    <Action.CopyToClipboard title="Copy Phone Number" content={primaryPhone} />
                    <Action.CopyToClipboard title="Copy Email" content={primaryEmail} />
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
