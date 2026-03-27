import React, { useState, useEffect } from "react";
import { List, ActionPanel, Action, Icon, showToast, Toast, Form, LocalStorage } from "@raycast/api";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: "You are an expert recruiter assistant. If the user asks you to 'source leads', 'find candidates', or implies searching for talent, respond strictly with 'FUNCTION_CALL: SOURCE_LEADS'. Otherwise, provide a helpful natural language response."
      });

      const result = await model.generateContent(userQuery);
      const responseText = result.response.text();

      if (responseText.includes("FUNCTION_CALL: SOURCE_LEADS")) {
        // Trigger Mantiks API
        const leads = mockMantiksLeadSearch(userQuery);
        setSourcedLeads(leads);
        setMessages((prev) => [
          { role: "ai", text: `I fetched ${leads.length} leads for you via the Mantiks API. View them below!` },
          ...prev,
        ]);
      } else {
        setMessages((prev) => [{ role: "ai", text: responseText }, ...prev]);
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
      searchBarPlaceholder="Ask Raycruiter: 'Source leads for Engineers...'"
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Ask Raycruiter"
      isShowingDetail={sourcedLeads !== null}
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
