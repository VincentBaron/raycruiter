import React, { useState, useEffect } from "react";
import { environment, List, ActionPanel, Action, Icon, showToast, Toast, Form, LocalStorage } from "@raycast/api";
import { GoogleGenerativeAI, SchemaType, FunctionCall } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Simulated Mantiks API response
const mockMantiksLeadSearch = (query: string) => {
  return [
    {
      id: `mantiks-${Date.now()}-1`,
      name: "Alice Johnson",
      title: "Senior Software Engineer",
      company: "Stripe",
      phone: "+1 (555) 019-2831",
      email: "alice@stripe.mock",
    },
    {
      id: `mantiks-${Date.now()}-2`,
      name: "Bob Smith",
      title: "Backend Developer",
      company: "Square",
      phone: "+1 (555) 921-3942",
      email: "bob@square.mock",
    },
    {
      id: `mantiks-${Date.now()}-3`,
      name: "Carol Danvers",
      title: "Lead Engineer",
      company: "Shopify",
      phone: "+1 (555) 382-9104",
      email: "carol@shopify.mock",
    },
  ];
};

export default function Command() {
  const [apiKey, setApiKey] = useState<string | undefined>();
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sourcedLeads, setSourcedLeads] = useState<any[] | null>(null);
  const [foundDeals, setFoundDeals] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      const storedKey = await LocalStorage.getItem<string>("GEMINI_API_KEY");
      if (storedKey) setApiKey(storedKey);
      setIsLoadingKey(false);
    })();
  }, []);

  if (isLoadingKey) {
    return <List isLoading={true} />;
  }

  if (!apiKey) {
    return (
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm
              title="Save API Key"
              onSubmit={async (values: { key: string }) => {
                if (values.key.trim().length > 0) {
                  await LocalStorage.setItem("GEMINI_API_KEY", values.key.trim());
                  setApiKey(values.key.trim());
                  showToast(Toast.Style.Success, "API Key Saved to Local Cache");
                } else {
                  showToast(Toast.Style.Failure, "Please enter a valid key");
                }
              }}
            />
          </ActionPanel>
        }
      >
        <Form.Description text="Enter your Gemini API Key to use Ask Raycruiter. It will be stored securely in local cache." />
        <Form.PasswordField id="key" title="Gemini API Key" placeholder="AIzaSy..." />
      </Form>
    );
  }


  const onSubmit = async () => {
    if (!searchText.trim()) return;
    const userQuery = searchText;
    setMessages((prev) => [{ role: "user", text: userQuery }, ...prev]);
    setSearchText("");
    setIsLoading(true);
    setSourcedLeads(null); // clear previous leads
    setFoundDeals(null); // clear previous deals

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const searchDealsTool: any = {
        functionDeclarations: [
          {
            name: "search_deals",
            description: "Search the local deals dataset for active pipelines, companies, and deals by name or keyword.",
            parameters: {
              type: SchemaType.OBJECT,
              properties: {
                keywords: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                  description: "A list of specific companies, person names, or inferred tech industry names generated intelligently by you based on the user's intent to query the local ATS (e.g. ['tudigo', 'karmen', 'fintech', 'john']).",
                },
              },
              required: ["keywords"],
            },
          },
        ],
      };

      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        tools: [searchDealsTool],
        systemInstruction: "You are an expert recruiter and pipeline manager. When asked about deals or companies, strictly call the 'search_deals' function to fetch real data from the local ATS. If the user asks for leads or sourcing, output 'FUNCTION_CALL: SOURCE_LEADS'. Always format output nicely using Markdown."
      });

      // Maintain chat history for function calling loop
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "ai" ? "model" : "user",
          parts: [{ text: m.text }]
        })).reverse() // Reverse to chronological order
      });

      const result = await chat.sendMessage(userQuery);
      let response = result.response;

      // Intercept Function Calls for Local RAG filtering
      const calls = response.functionCalls ? response.functionCalls() : undefined;
      if (calls && calls.length > 0) {
        const call: FunctionCall = calls[0];
        if (call.name === "search_deals") {
          const rawKeywords = (call.args as any).keywords;
          const keywords: string[] = Array.isArray(rawKeywords) ? rawKeywords.map(k => String(k).toLowerCase()) : [];
          
          const dealsPath = path.join(environment.assetsPath, "deals.json");
          const dealsData = JSON.parse(fs.readFileSync(dealsPath, "utf-8"));

          let matches = [];
          
          if (keywords.length === 0) {
            // Default return for empty searches
            matches = (dealsData as any[]).slice(0, 15);
          } else {
            matches = (dealsData as any[])
              .filter((d) => {
                const title = d.title?.toLowerCase() || "";
                const website = d.website?.toLowerCase() || "";
                const personName = d.person_id?.name?.toLowerCase() || "";
                
                // Match if ANY of the AI-provided keywords are found in the deal fields
                return keywords.some(k => title.includes(k) || website.includes(k) || personName.includes(k));
              })
              .slice(0, 15); // Send max 15 to perfectly balance context vs memory
          }
          
          setFoundDeals(matches);

          // Send the specific JSON block back to the chat model
          const functionResult = await chat.sendMessage([{
            functionResponse: {
              name: "search_deals",
              response: { results: matches }
            }
          }]);
          
          response = functionResult.response;
        }
      }

      const responseText = response.text();

      if (responseText.includes("FUNCTION_CALL: SOURCE_LEADS")) {
        // Trigger Mantiks API
        setIsLoading(true);
        setTimeout(() => {
          const leads = mockMantiksLeadSearch(userQuery);
          setSourcedLeads(leads);
          setMessages((prev) => [{ role: "system", text: `(System) Successfully found ${leads.length} prospect(s) via Mantiks API.` }, ...prev]);
          setIsLoading(false);
        }, 1200);
      } else {
        // Fake an LLM streaming typewriter effect
        setMessages((prev) => [{ role: "ai", text: "" }, ...prev]);
        
        // Split text by words and whitespaces to animate token chunks
        const tokens = responseText.match(/(\S+|\s+)/g) || [responseText];
        let currentText = "";
        
        for (let i = 0; i < tokens.length; i++) {
          currentText += tokens[i];
          // Use a functional state update to safely replace the top message's text
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[0] = { ...newMessages[0], text: currentText };
            return newMessages;
          });
          // Artificial delay block (faster on whitespaces, slightly randomized word latency)
          const delayMs = tokens[i].trim().length === 0 ? 5 : Math.floor(Math.random() * 25) + 15;
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    } catch (error: any) {
      console.error("🔍 Gemini API Error Details:", error);
      console.error("Message:", error?.message);
      console.error("Status:", error?.status);
      console.error("Details:", error?.details);

      showToast(Toast.Style.Failure, "Google API Error", error?.message || String(error));
      setMessages((prev) => [{ role: "system", text: `API Error: ${error?.message || String(error)}` }, ...prev]);
    }

    setIsLoading(false);
  };

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Ask Raycruiter: 'Get deals in fintech...'"
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Ask Raycruiter"
      isShowingDetail={(sourcedLeads !== null && sourcedLeads.length > 0) || (foundDeals !== null && foundDeals.length > 0)}
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

      {/* RENDER NLP RETRIEVED ATS DEALS */}
      {foundDeals && foundDeals.length > 0 && (
        <List.Section title="Local ATS Deals">
          {foundDeals.map((deal) => (
            <List.Item
              key={deal.id}
              title={deal.title || "Unknown Deal"}
              subtitle={deal.status ? `Status: ${deal.status}` : undefined}
              icon={Icon.Folder}
              detail={
                <List.Item.Detail
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.Label title="Deal Name" text={deal.title || "Unknown"} />
                      <List.Item.Detail.Metadata.Label title="Deal ID" text={deal.id?.toString() || ""} />
                      {deal.website && <List.Item.Detail.Metadata.Link title="Website" target={deal.website.startsWith("http") ? deal.website : `https://${deal.website}`} text={deal.website} />}
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Primary Contact" text={deal.person_id?.name || "N/A"} icon={Icon.Person} />
                      {deal.person_id?.email?.[0]?.value && (
                        <List.Item.Detail.Metadata.Label title="Email" text={deal.person_id.email[0].value} icon={Icon.Envelope} />
                      )}
                      {deal.person_id?.phone?.[0]?.value && (
                        <List.Item.Detail.Metadata.Label title="Phone" text={deal.person_id.phone[0].value} icon={Icon.Phone} />
                      )}
                    </List.Item.Detail.Metadata>
                  }
                />
              }
              actions={
                <ActionPanel>
                  {deal.website && <Action.OpenInBrowser title="Open Website" url={deal.website.startsWith("http") ? deal.website : `https://${deal.website}`} />}
                  {deal.person_id?.email?.[0]?.value && <Action.CopyToClipboard title="Copy Email" content={deal.person_id.email[0].value} />}
                  {deal.person_id?.phone?.[0]?.value && <Action.CopyToClipboard title="Copy Phone" content={deal.person_id.phone[0].value} />}
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      {/* RENDER SOURCED LEADS (POWER DIAL VIEW) */}
      {sourcedLeads && sourcedLeads.length > 0 && (
        <List.Section title="Sourced Leads (Mantiks API)">
          {sourcedLeads.map((lead) => (
            <List.Item
              key={lead.id}
              title={lead.name}
              subtitle={`${lead.title} @ ${lead.company}`}
              icon={Icon.PersonCircle}
              detail={
                <List.Item.Detail
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.Label title="Name" text={lead.name} />
                      <List.Item.Detail.Metadata.Label title="Role" text={lead.title} />
                      <List.Item.Detail.Metadata.Label title="Company" text={lead.company} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Phone" text={lead.phone} icon={Icon.Phone} />
                      <List.Item.Detail.Metadata.Label title="Email" text={lead.email} icon={Icon.Envelope} />
                    </List.Item.Detail.Metadata>
                  }
                />
              }
              actions={
                <ActionPanel>
                  {/* Primary Action: Simulates power dialing via telephone protocol */}
                  <Action.OpenInBrowser title="Power Dial" url={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`} icon={Icon.Phone} />
                  <Action.CopyToClipboard title="Copy Email" content={lead.email} shortcut={{ modifiers: ["cmd"], key: "e" }} />
                  <Action.CopyToClipboard title="Copy Phone Number" content={lead.phone} shortcut={{ modifiers: ["cmd", "shift"], key: "p" }} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      <List.Section title="Chat History & Responses">
        {messages.map((msg, i) => (
          <List.Item
            key={i}
            title={msg.text}
            icon={msg.role === "user" ? Icon.PersonCircle : msg.role === "system" ? Icon.Exclamationmark2 : Icon.Stars}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard content={msg.text} title="Copy Message" />
                <Action title="Clear Cache API Key" icon={Icon.Trash} shortcut={{ modifiers: ["cmd", "shift"], key: "delete" }} onAction={async () => {
                  await LocalStorage.removeItem("GEMINI_API_KEY");
                  setApiKey(undefined);
                  showToast(Toast.Style.Success, "API Key Removed");
                }} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      {messages.length === 0 && searchText.length === 0 && !sourcedLeads && (
        <List.EmptyView
          title="Ask Raycruiter Copilot"
          description="Try typing: 'Source leads for software engineers'"
          icon={Icon.Wand}
        />
      )}
    </List>
  );
}
