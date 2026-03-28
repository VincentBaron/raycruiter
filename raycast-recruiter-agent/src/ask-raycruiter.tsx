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

// Simulated Mantiks Deal Generation API
const mockMantiksDealSearch = (industry: string, amount: number) => {
  const deals = [];
  for (let i = 0; i < (amount || 3); i++) {
    deals.push({
      id: `mantiks-deal-${Date.now()}-${i}`,
      title: `Mantiks Generated ${industry || "Tech"} Pipeline`,
      status: "open",
      value: Math.floor(Math.random() * 80000) + 20000, // Random $20k to $100k
      website: `fake-${(industry || "AI").toLowerCase().replace(" ", "")}-deal-${i}.ai`,
      next_activity_date: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
      person_id: {
        name: `CEO of Mantiks Lead ${i + 1}`,
        email: [{ value: `founder@mantiks.ai` }],
        phone: [{ value: "+1 555 999 8888" }]
      }
    });
  }
  return deals;
};

export default function Command() {
  const [apiKey, setApiKey] = useState<string | undefined>();
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sourcedLeads, setSourcedLeads] = useState<any[] | null>(null);
  const [foundDeals, setFoundDeals] = useState<any[] | null>(null);
  const [generatedDeals, setGeneratedDeals] = useState<any[] | null>(null);

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


  const onSubmit = async (queryOverride?: string | any) => {
    const finalQuery = typeof queryOverride === "string" ? queryOverride : searchText;
    if (!finalQuery.trim()) return;
    
    setMessages((prev) => [{ role: "user", text: finalQuery }, ...prev]);
    setSearchText("");
    setIsLoading(true);
    setSourcedLeads(null); // clear previous leads
    setFoundDeals(null); // clear previous deals
    setGeneratedDeals(null); // clear previous generations

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
                orderBy: {
                  type: SchemaType.STRING,
                  description: "Optional sorting request (e.g. 'date' to order by closest due date, or 'value' for deal size).",
                },
              },
              required: ["keywords"],
            },
          },
          {
            name: "generate_mantiks_deals",
            description: "Generate and auto-pipeline highly qualified B2B deals sourced via Mantiks.",
            parameters: {
              type: SchemaType.OBJECT,
              properties: {
                industry: { type: SchemaType.STRING, description: "The industry to source leads in." },
                amount: { type: SchemaType.NUMBER, description: "Number of deals to generate." }
              },
              required: ["industry", "amount"],
            },
          },
        ],
      };

      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        tools: [searchDealsTool],
        systemInstruction: "You are an expert recruiter and pipeline manager. When asked about existing deals, use 'search_deals'. IF the user asks to explicitly 'generate', 'source', or 'find brand new deals via Mantiks', ALWAYS call 'generate_mantiks_deals'. Always format output nicely using Markdown."
      });

      // Maintain chat history for function calling loop
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "ai" ? "model" : "user",
          parts: [{ text: m.text }]
        })).reverse() // Reverse to chronological order
      });

      const result = await chat.sendMessage(finalQuery);
      let response = result.response;

      // Intercept Function Calls for Local RAG filtering
      const calls = response.functionCalls ? response.functionCalls() : undefined;
      if (calls && calls.length > 0) {
        const call: FunctionCall = calls[0];
        
        if (call.name === "search_deals") {
          console.log("🤖 [RAG INTERCEPT] AI invoked 'search_deals'. Arguments:", JSON.stringify(call.args));
          
          const rawKeywords = (call.args as any).keywords;
          const orderBy = typeof (call.args as any).orderBy === 'string' ? (call.args as any).orderBy.toLowerCase() : null;
          const keywords: string[] = Array.isArray(rawKeywords) ? rawKeywords.map(k => String(k).toLowerCase()) : [];
          
          const dealsPath = path.join(environment.assetsPath, "deals.json");
          const dealsData = JSON.parse(fs.readFileSync(dealsPath, "utf-8"));

          let matches = [];
          
          if (keywords.length === 0) {
            matches = (dealsData as any[]);
          } else {
            matches = (dealsData as any[])
              .filter((d) => {
                const title = d.title?.toLowerCase() || "";
                const website = d.website?.toLowerCase() || "";
                const personName = d.person_id?.name?.toLowerCase() || "";
                return keywords.some(k => title.includes(k) || website.includes(k) || personName.includes(k));
              });
          }

          // Dynamic Math Sorting
          if (orderBy === "date") {
            matches.sort((a, b) => new Date(a.next_activity_date || 0).getTime() - new Date(b.next_activity_date || 0).getTime());
          } else if (orderBy === "value" || orderBy === "signal") {
            matches.sort((a, b) => (b.value || 0) - (a.value || 0)); // High value proxy for signal
          }
          
          matches = matches.slice(0, 15); // Send max 15 to perfectly balance context vs memory
          
          console.log(`✅ [RAG RETURN] Sending ${matches.length} matches back to AI. Example deal title:`, matches[0]?.title || "None");
          
          setFoundDeals(matches);

          // Strip ugly backend internal IDs so the LLM is forced to use human-readable titles
          const aiCleanedMatches = matches.map(m => ({
            title: m.title || m.website || m.person_id?.name || "Pipeline Deal",
            value: m.value,
            status: m.status,
            date: m.next_activity_date
          }));

          const functionResult = await chat.sendMessage([{
            functionResponse: {
              name: "search_deals",
              response: { results: aiCleanedMatches }
            }
          }]);
          
          response = functionResult.response;
        } else if (call.name === "generate_mantiks_deals") {
          console.log("🤖 [MANTIKS INTERCEPT] AI invoked 'generate_mantiks_deals'. Arguments:", JSON.stringify(call.args));
          
          const industry = (call.args as any).industry || "Tech";
          const amount = (call.args as any).amount || 3;
          
          const newDeals = mockMantiksDealSearch(industry, amount);
          
          console.log(`✨ [MANTIKS RETURN] Generated ${newDeals.length} deals. Sending back to AI.`);
          
          setGeneratedDeals(newDeals);

          // Clean generated deals to prevent alphanumeric key leakage
          const aiCleanedGens = newDeals.map(m => ({
            title: m.title,
            value: m.value,
            status: m.status,
            date: m.next_activity_date
          }));

          const functionResult = await chat.sendMessage([{
            functionResponse: {
              name: "generate_mantiks_deals",
              response: { results: aiCleanedGens }
            }
          }]);
          
          response = functionResult.response;
        }
      }

      const responseText = response.text();
      console.log("📝 [AI TEXT RESPONSE] Raw string output intercepted from Gemini:", responseText);

      if (responseText.includes("FUNCTION_CALL: SOURCE_LEADS")) {
        // Trigger Mantiks API
        setIsLoading(true);
        setTimeout(() => {
          const leads = mockMantiksLeadSearch(finalQuery);
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
      isShowingDetail={(sourcedLeads !== null && sourcedLeads.length > 0) || (foundDeals !== null && foundDeals.length > 0) || (generatedDeals !== null && generatedDeals.length > 0)}
    >
      {/* EMPTY STATE SUGGESTIONS */}
      {searchText.length === 0 && messages.length === 0 && !sourcedLeads && !foundDeals && !generatedDeals && (
        <List.Section title="Suggested Prompts">
          <List.Item
            title="Sort active deals by due date"
            icon={Icon.LightBulb}
            actions={<ActionPanel><Action title="Ask AI" icon={Icon.Wand} onAction={() => onSubmit("Sort active deals by due date")} /></ActionPanel>}
          />
          <List.Item
            title="Generate 5 new Fintech leads via Mantiks"
            icon={Icon.LightBulb}
            actions={<ActionPanel><Action title="Ask AI" icon={Icon.Wand} onAction={() => onSubmit("Generate 5 new Fintech leads via Mantiks")} /></ActionPanel>}
          />
          <List.Item
            title="Find the highest value deals in my pipeline"
            icon={Icon.LightBulb}
            actions={<ActionPanel><Action title="Ask AI" icon={Icon.Wand} onAction={() => onSubmit("Find the highest value deals in my pipeline")} /></ActionPanel>}
          />
          <List.Item
            title="Look up the status of the Karmen deal"
            icon={Icon.LightBulb}
            actions={<ActionPanel><Action title="Ask AI" icon={Icon.Wand} onAction={() => onSubmit("Look up the status of the Karmen deal")} /></ActionPanel>}
          />
        </List.Section>
      )}

      {searchText.length > 0 && (
        <List.Item
          title={`Ask Raycruiter to '${searchText}'`}
          icon={Icon.Wand}
          actions={
            <ActionPanel>
              <Action title="Send Request" icon={Icon.Message} onAction={() => onSubmit()} />
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
              accessories={[
                { text: deal.value ? `$${deal.value.toLocaleString()}` : "" },
                deal.next_activity_date ? { date: new Date(deal.next_activity_date), tooltip: "Next Activity Date" } : {}
              ].filter((a) => Object.keys(a).length > 0)}
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

      {/* RENDER MANTIKS GENERATED DEALS */}
      {generatedDeals && generatedDeals.length > 0 && (
        <List.Section title="✨ AI Sourced Deals (Mantiks)">
          {generatedDeals.map((deal) => (
            <List.Item
              key={deal.id}
              title={deal.title || "Unknown Deal"}
              subtitle={deal.status ? `Status: ${deal.status}` : undefined}
              icon={Icon.Stars}
              accessories={[
                { text: deal.value ? `$${deal.value.toLocaleString()}` : "", tooltip: "Deal Value (Mantiks Estimate)" },
                deal.next_activity_date ? { date: new Date(deal.next_activity_date), tooltip: "Auto-Scheduled Kickoff" } : {}
              ].filter((a) => Object.keys(a).length > 0)}
              detail={
                <List.Item.Detail
                  metadata={
                    <List.Item.Detail.Metadata>
                      <List.Item.Detail.Metadata.Label title="Deal Name" text={deal.title || "Unknown"} />
                      <List.Item.Detail.Metadata.Label title="Deal ID" text={deal.id?.toString() || ""} />
                      {deal.website && <List.Item.Detail.Metadata.Link title="Website" target={deal.website.startsWith("http") ? deal.website : `https://${deal.website}`} text={deal.website} />}
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Generated Target" text={deal.person_id?.name || "N/A"} icon={Icon.Person} />
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
