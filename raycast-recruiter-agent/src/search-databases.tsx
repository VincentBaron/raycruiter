import React from "react";
import { List, ActionPanel, Action, Icon, useNavigation } from "@raycast/api";

import LocalSearch from "./local-search";
import QueryKalent from "./query-kalent";
import ViewCandidates from "./view-candidates";
import MatchCandidates from "./match-candidates";
import TopTalents from "./top-talents";

const SEARCH_MODULES = [
  { id: "local", title: "Local DB Search", subtitle: "Search Organizations, Deals, & Prospects natively", icon: Icon.MagnifyingGlass, component: <LocalSearch /> },
  { id: "kalent", title: "Kalent Talent Query", subtitle: "Search the global Kalent Database", icon: Icon.Globe, component: <QueryKalent /> },
  { id: "ats", title: "View Candidates", subtitle: "Browse your synced ATS candidates", icon: Icon.Person, component: <ViewCandidates /> },
  { id: "jemmo", title: "Jemmo AI Matching", subtitle: "Vector-rank candidates using Jemmo AI", icon: Icon.Star, component: <MatchCandidates /> },
  { id: "top", title: "Top Fresh Talents", subtitle: "Source high-signal prospects", icon: Icon.Trophy, component: <TopTalents /> }
];

export default function SearchDatabasesHub() {
  const { push } = useNavigation();

  return (
    <List navigationTitle="Global AI Search" searchBarPlaceholder="Select a search module...">
      <List.Section title="Raycruiter Intelligence Hub">
        {SEARCH_MODULES.map((mod) => (
          <List.Item
            key={mod.id}
            icon={mod.icon}
            title={mod.title}
            subtitle={mod.subtitle}
            actions={
              <ActionPanel>
                <Action 
                   title={`Open ${mod.title}`} 
                   icon={Icon.ChevronRight} 
                   onAction={() => push(mod.component)} 
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
