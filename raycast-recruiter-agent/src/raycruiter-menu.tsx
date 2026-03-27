import React, { useState } from "react";
import { List, launchCommand, LaunchType, Icon, ActionPanel, Action } from "@raycast/api";

const COMMANDS = [
  { name: "view-crm", title: "Deals", subtitle: "Manage deals pipeline", icon: "extension_logo.png" },
  { name: "jobs", title: "Jobs", subtitle: "Browse vacancies", icon: "extension_logo.png" },
  { name: "source-prospects", title: "Prospects", subtitle: "Manage sourced prospects", icon: "extension_logo.png" },
  { name: "persons", title: "Persons", subtitle: "Manage CRM persons", icon: "extension_logo.png" },
  { name: "power-dialer", title: "Power Dialer", subtitle: "Call and go through contacts quickly", icon: "extension_logo.png" },
  { name: "create-job", title: "Create Vacancy", subtitle: "Open a new requisite", icon: "extension_logo.png" },
  { name: "view-candidates", title: "View Candidates", subtitle: "Browse ATS candidates", icon: "extension_logo.png" },
  { name: "jobs", title: "View Open Jobs", subtitle: "Browse open vacancies", icon: "extension_logo.png" },
  { name: "match-candidates", title: "Jemmo AI Matching", subtitle: "Rank candidates using Jemmo AI", icon: "extension_logo.png" },
  { name: "top-talents", title: "Top Fresh Talents", subtitle: "High-signal talents & company sourcing", icon: "extension_logo.png" },
  { name: "query-kalent", title: "Query Kalent", subtitle: "Search the Kalent Talents DB", icon: "extension_logo.png" },
  { name: "search-databases", title: "Search Databases", subtitle: "View Deals, Prospects, and Organisations", icon: "extension_logo.png" },
  { name: "configure-integrations", title: "Configure Integrations", subtitle: "Manage API keys & License", icon: Icon.Gear },
  { name: "switch-ai-model", title: "Switch AI Model", subtitle: "Change Active Model", icon: "extension_logo.png" },
];

export default function RaycruiterMenu() {
  return (
    <List navigationTitle="Raycruiter Menu" searchBarPlaceholder="Search Raycruiter Commands...">
      <List.Section title="Raycruiter Tools">
        {COMMANDS.map((cmd) => (
          <List.Item
            key={cmd.name}
            icon={cmd.icon}
            title={cmd.title}
            subtitle={cmd.subtitle}
            actions={
              <ActionPanel>
                <Action 
                   title="Open Command" 
                   icon={Icon.ChevronRight} 
                   onAction={async () => {
                     await launchCommand({ name: cmd.name, type: LaunchType.UserInitiated });
                   }} 
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
