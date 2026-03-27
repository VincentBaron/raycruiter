import { List } from "@raycast/api";
import { useState } from "react";
import { EntityListItem } from "../components/EntityListItem";

interface EntityListProps {
  isLoading: boolean;
  deals: any[];
  jobs: any[];
  prospects: any[];
  candidates: any[];
  navigationTitle?: string;
}

export function EntityList({ isLoading, deals, jobs, prospects, candidates, navigationTitle = "Database" }: EntityListProps) {
  const [searchText, setSearchText] = useState("");

  const filterData = (data: any[]) => {
    return data.filter((item) => {
      const name = item.name || item.title || "";
      const subtitle = item.clientName || item.company || "";
      const searchLower = searchText.toLowerCase();
      return name.toLowerCase().includes(searchLower) || subtitle.toLowerCase().includes(searchLower);
    });
  };

  return (
    <List 
      isLoading={isLoading} 
      onSearchTextChange={setSearchText} 
      searchBarPlaceholder={`Search ${navigationTitle}...`}
      navigationTitle={navigationTitle}
    >
      <List.Section title="Deals">
        {filterData(deals).map(deal => (
          <EntityListItem key={deal.id} type="Deal" data={deal} />
        ))}
      </List.Section>

      <List.Section title="Jobs">
        {filterData(jobs).map(job => (
          <EntityListItem key={job.id} type="Job" data={job} />
        ))}
      </List.Section>

      <List.Section title="Prospects">
        {filterData(prospects).map(prospect => (
          <EntityListItem key={prospect.id} type="Prospect" data={prospect} />
        ))}
      </List.Section>

      <List.Section title="Candidates">
        {filterData(candidates).map(candidate => (
          <EntityListItem key={candidate.id} type="Candidate" data={candidate} />
        ))}
      </List.Section>
    </List>
  );
}
