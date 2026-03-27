import { List } from "@raycast/api";
import { useState } from "react";
import { useMockData } from "./hooks/useMockData";
import { EntityListItem } from "./components/EntityListItem";

export default function Command() {
  const { deals, jobs, prospects, candidates } = useMockData();
  const [searchText, setSearchText] = useState("");

  // Create a unified inbox Array wrapping each entity type for simple mapping
  const allItems = [
    ...deals.map(d => ({ type: "Deal", data: d, score: d.status === "open" ? 3 : 1 })),
    ...jobs.map(j => ({ type: "Job", data: j, score: j.status === "open" ? 2 : 1 })),
    ...prospects.map(p => ({ type: "Prospect", data: p, score: p.signalStrength === "high" ? 3 : 2 })),
    ...candidates.map(c => ({ type: "Candidate", data: c, score: 3 })) // Highly active pipeline
  ].sort((a, b) => b.score - a.score);

  const filteredItems = allItems.filter(({ data }) => {
    const name = data.name || data.title || "";
    const lowerSearch = searchText.toLowerCase();
    return name.toLowerCase().includes(lowerSearch);
  });

  return (
    <List 
      searchBarPlaceholder="Filter specific items in Inbox..." 
      navigationTitle="Inbox"
      onSearchTextChange={setSearchText}
    >
      <List.Section title="Priorities & Outstanding Actions">
        {filteredItems.map((item, idx) => (
          <EntityListItem key={`${item.type}-${item.data.id}-${idx}`} type={item.type as any} data={item.data} />
        ))}
      </List.Section>
    </List>
  );
}
