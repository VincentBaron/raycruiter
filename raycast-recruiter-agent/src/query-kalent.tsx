import React, { useState, useEffect } from "react";
import { List, LocalStorage, ActionPanel, Action, showToast, Toast, Icon } from "@raycast/api";

export default function QueryKalent() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("query");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    async function load() {
      const key = await LocalStorage.getItem<string>("KALENT_API_KEY");
      if (key) {
         setApiKey(key);
         await fetchCandidates(key, "", "query");
      } else {
         showToast({ style: Toast.Style.Failure, title: "Missing API Key", message: "Set Kalent API Key in Integrations Hub" });
      }
    }
    load();
  }, []);

  async function fetchCandidates(token: string, search: string, fType: string) {
    setLoading(true);
    try {
      const payload: any = {};
      if (search) {
         const filterObj: any = {};
         filterObj[fType] = search;
         payload.filters = [filterObj];
      } else {
         payload.filters = [];
      }

      const resp = await fetch("https://app.kalent.ai/api/v1/search/talents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": token
        },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error(`Status ${resp.status}: ${resp.statusText}`);
      
      const text = await resp.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch(e) {}

      setCandidates(data?.talents || data?.data || data || []);
    } catch (err: any) {
      showToast({ style: Toast.Style.Failure, title: "Kalent API Error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <List 
      isLoading={loading} 
      searchBarPlaceholder={`Search talents by ${filterType}...`} 
      onSearchTextChange={(t) => {
         setQuery(t);
         if (apiKey && t.length > 2) fetchCandidates(apiKey, t, filterType);
      }}
      searchBarAccessory={
         <List.Dropdown tooltip="Filter Candidates" onChange={(val) => {
            setFilterType(val);
            if (apiKey && query.length > 2) fetchCandidates(apiKey, query, val);
         }}>
            <List.Dropdown.Section title="Kalent Filters">
               <List.Dropdown.Item title="Keyword Match" value="query" />
               <List.Dropdown.Item title="Required Skills" value="skills" />
               <List.Dropdown.Item title="Current Job Title" value="job_title" />
               <List.Dropdown.Item title="Target Location" value="location" />
               <List.Dropdown.Item title="Company Name" value="company" />
            </List.Dropdown.Section>
         </List.Dropdown>
      }
      throttle
    >
      {candidates.length === 0 && !loading && (
         <List.EmptyView title="No Candidates Found" description="Try a broader search or verify your Kalent API token." icon={Icon.Person} />
      )}
      <List.Section title={`Kalent Candidates ${query ? `for "${query}"` : ""}`}>
        {Array.isArray(candidates) && candidates.map((c, idx) => (
          <List.Item
            key={c.id || idx}
            icon="extension_logo.png"
            title={c.name || "Unknown Candidate"}
            subtitle={c.headline || c.title || c.email || ""}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy Raw Result JSON" content={JSON.stringify(c, null, 2)} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
