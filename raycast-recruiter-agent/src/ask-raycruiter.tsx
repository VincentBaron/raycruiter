import React, { useState } from "react";
import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useMockData } from "./hooks/useMockData";

export default function Command() {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [searchText, setSearchText] = useState("");
  const { prospects, setProspects } = useMockData();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!searchText.trim()) return;
    const userQuery = searchText;
    setMessages(prev => [{ role: "user", text: userQuery }, ...prev]);
    setSearchText("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = `Generated 5 new leads based on "${userQuery}" and added them to Prospects.`;
      
      const newProspect = {
        id: `pro-ai-${Date.now()}`,
        name: `AI Generated Lead`,
        title: "Software Engineer",
        company: "Tech Startup",
        signalStrength: "high",
      };
      setProspects([...prospects, newProspect]);
      
      setMessages(prev => [{ role: "ai", text: aiResponse }, ...prev]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <List 
      isLoading={isLoading}
      searchBarPlaceholder="Ask Raycruiter: 'Generate leads for tech startups...'"
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Ask Raycruiter"
    >
      {searchText.length > 0 && (
        <List.Item 
          title={`Ask Raycruiter to '${searchText}'`} 
          icon={Icon.Wand}
          actions={
            <ActionPanel>
              <Action title="Send Request" icon={Icon.Message} onAction={onSubmit} />
            </ActionPanel>
          }
        />
      )}
      
      {messages.map((msg, i) => (
        <List.Item
          key={i}
          title={msg.text}
          icon={msg.role === "user" ? Icon.PersonCircle : Icon.Stars}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={msg.text} title="Copy Message" />
            </ActionPanel>
          }
        />
      ))}
      {messages.length === 0 && searchText.length === 0 && (
        <List.EmptyView 
          title="Ask Raycruiter" 
          description="Try asking: 'Generate 20 leads with this amount of employees...'" 
          icon={Icon.Stars} 
        />
      )}
    </List>
  );
}
