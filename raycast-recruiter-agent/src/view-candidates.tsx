import React, { useState, useMemo } from "react";
import { List, ActionPanel, Action, Icon, Color } from "@raycast/api";

type Candidate = {
  applicant: string;
  vacancy: string;
  column: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  source: string;
  shortId?: string;
};

export default function ViewCandidates() {
  const [searchText, setSearchText] = useState("");
  const rawCandidates: Candidate[] = require("../../candidates.json");

  const candidatesWithIds = useMemo(() => {
    return rawCandidates.map((c, i) => ({ ...c, shortId: `c${i + 1}` }));
  }, [rawCandidates]);

  // We only show a limited subset because mapping 800,000 JSON lines in UI will block React thread.
  // Memoize it and slice the first 1000 items, or filter based on search
  const filteredCandidates = useMemo(() => {
    const term = searchText.toLowerCase();
    
    let matched = 0;
    const results = [];
    
    for (const c of candidatesWithIds) {
      if (matched >= 300) break; // Limit UI render performance
      
      const fullName = `${c.firstname || ""} ${c.lastname || ""}`.toLowerCase();
      const vacancy = (c.vacancy || "").toLowerCase();
      
      if (!term || fullName.includes(term) || vacancy.includes(term) || c.shortId!.includes(term)) {
        results.push(c);
        matched++;
      }
    }
    return results;
  }, [searchText, candidatesWithIds]);

  // Group by Vacancy
  const groupedCandidates = useMemo(() => {
    const groups: Record<string, Candidate[]> = {};
    for (const c of filteredCandidates) {
      const v = c.vacancy || "Unknown Vacancy";
      if (!groups[v]) groups[v] = [];
      groups[v].push(c);
    }
    return groups;
  }, [filteredCandidates]);

  return (
    <List
      onSearchTextChange={setSearchText}
      searchBarPlaceholder={`Search through ${rawCandidates.length} ATS candidates...`}
      navigationTitle="ATS Candidates"
    >
      {Object.entries(groupedCandidates).map(([vacancy, candidates]) => (
        <List.Section key={vacancy} title={vacancy} subtitle={`${candidates.length} candidates visible`}>
          {candidates.map((c, i) => {
            const fullName = `${c.firstname} ${c.lastname}`;
            return (
              <List.Item
                key={`${c.applicant}-${i}`}
                icon={{ source: Icon.Person, tintColor: Color.Purple }}
                title={`[${c.shortId}] ${fullName}`}
                subtitle={`${c.column} • ${c.source}`}
                accessories={[{ text: c.email }]}
                actions={
                  <ActionPanel>
                    <Action.CopyToClipboard title="Copy Email" content={c.email || ""} />
                    {c.phone && <Action.CopyToClipboard title="Copy Phone" content={c.phone} />}
                  </ActionPanel>
                }
              />
            );
          })}
        </List.Section>
      ))}
    </List>
  );
}
