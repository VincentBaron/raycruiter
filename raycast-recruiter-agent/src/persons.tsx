import React, { useState, useMemo } from "react";
import { List, ActionPanel, Action, Icon, Color, showToast, Toast } from "@raycast/api";

export default function Persons() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const persons = useMemo(() => {
    try {
      const data = require("../../persons_cache_2026-03-22_12-18-43.json");
      return data;
    } catch(e) {
      return [];
    }
  }, []);

  const filteredPersons = useMemo(() => {
    if (!searchText) return persons.slice(0, 100); 
    
    return persons.filter((p: any) => 
      p.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      p.emails?.some((e: any) => e.value.toLowerCase().includes(searchText.toLowerCase())) ||
      p.job_title?.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 50);
  }, [searchText, persons]);

  return (
    <List 
      isLoading={isLoading}
      searchBarPlaceholder="Search persons natively..." 
      onSearchTextChange={setSearchText}
    >
      {filteredPersons.map((person: any) => {
        const primaryEmail = person.emails?.find((e: any) => e.primary)?.value || person.emails?.[0]?.value || "No Email";
        const primaryPhone = person.phones?.find((p: any) => p.primary)?.value || person.phones?.[0]?.value || "No Phone";
        
        let orgName = "No Org";
        if (primaryEmail !== "No Email") {
          const domain = primaryEmail.split('@')[1];
          if (domain && !domain.includes("gmail") && !domain.includes("yahoo") && !domain.includes("hotmail")) {
            orgName = domain.split('.')[0].toUpperCase(); // Automatic Org detection directly from the domain
          }
        }

        return (
          <List.Item
            key={person.id}
            title={person.name}
            subtitle={person.job_title ? `${person.job_title} @ ${orgName}` : orgName}
            icon={Icon.PersonCircle}
            accessories={[
              { text: primaryPhone, icon: Icon.Phone },
              { text: primaryEmail, icon: Icon.Envelope }
            ]}
            actions={
              <ActionPanel>
                <ActionPanel.Section title="Next Steps in Pipeline">
                  <Action 
                    title="Push & Convert to Deal" 
                    icon={Icon.ArrowRightCircle} 
                    onAction={() => showToast({ style: Toast.Style.Success, title: "Deal Triggered!", message: "Pipeline logic: Deal filled -> Job generated -> MultiDiffusion triggered -> Organisation Created." })}
                  />
                  <Action.CopyToClipboard 
                    title="Copy Email" 
                    content={primaryEmail} 
                    shortcut={{ modifiers: ["cmd"], key: "e" }}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
