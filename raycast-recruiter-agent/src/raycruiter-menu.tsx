import React from "react";
import { List, ActionPanel, Action, Icon, useNavigation } from "@raycast/api";

import CrmView from "./view-crm";
import JobsCommand from "./jobs";
import SourceProspects from "./source-prospects";
import Persons from "./persons";

const HUB_COMMANDS = [
  { id: "crm", title: "Deals Pipeline", subtitle: "Manage active CRM deals", icon: Icon.Box, component: <CrmView /> },
  { id: "jobs", title: "Job Vacancies", subtitle: "Browse open jobs", icon: Icon.List, component: <JobsCommand /> },
  { id: "prospects", title: "Prospects", subtitle: "Manage sourced prospects", icon: Icon.Person, component: <SourceProspects /> },
  { id: "persons", title: "Persons Details", subtitle: "Search CRM persons natively", icon: Icon.MagnifyingGlass, component: <Persons /> },
];

export default function RaycruiterMenu() {
  const { push } = useNavigation();

  return (
    <List navigationTitle="Raycruiter Hub" searchBarPlaceholder="Search Deals, Jobs, or Prospects...">
      <List.Section title="Raycruiter CRM Hub">
        {HUB_COMMANDS.map((cmd) => (
          <List.Item
            key={cmd.id}
            icon={cmd.icon}
            title={cmd.title}
            subtitle={cmd.subtitle}
            actions={
              <ActionPanel>
                <Action 
                   title={`Open ${cmd.title}`} 
                   icon={Icon.ChevronRight} 
                   onAction={() => push(cmd.component)} 
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
