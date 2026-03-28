import React, { useState, useEffect } from "react";
import {
  List,
  LocalStorage,
  ActionPanel,
  Action,
  showToast,
  Toast,
  Icon,
  useNavigation,
  Form,
} from "@raycast/api";

function EditProviderKey({
  providerName,
  storageKey,
  onSave,
}: {
  providerName: string;
  storageKey: string;
  onSave: () => void;
}) {
  const { pop } = useNavigation();

  async function handleSubmit(values: { apiKey: string }) {
    if (!values.apiKey) {
      await LocalStorage.removeItem(storageKey);
    } else {
      await LocalStorage.setItem(storageKey, values.apiKey);
    }
    showToast({
      style: Toast.Style.Success,
      title: `${providerName} Key Saved`,
    });
    onSave();
    pop();
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save API Key" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description
        text={`Enter your exact API key for ${providerName} below.`}
      />
      <Form.PasswordField id="apiKey" title="API Key" placeholder="sk-..." />
    </Form>
  );
}

export default function ConfigureAiProviders() {
  const [openAiKey, setOpenAiKey] = useState<string | undefined>();
  const [geminiKey, setGeminiKey] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  async function loadKeys() {
    setLoading(true);
    const ok = await LocalStorage.getItem<string>("OPENAI_API_KEY");
    const gk = await LocalStorage.getItem<string>("GEMINI_API_KEY");
    setOpenAiKey(ok);
    setGeminiKey(gk);
    setLoading(false);
  }

  useEffect(() => {
    loadKeys();
  }, []);

  return (
    <List isLoading={loading} searchBarPlaceholder="Search Providers...">
      <List.Item
        title="Google Gemini"
        subtitle="Provides gemini-2.0-flash, gemini-1.5-pro, etc."
        icon={Icon.Stars}
        accessories={[
          {
            icon: geminiKey ? Icon.CheckCircle : Icon.Circle,
            tooltip: geminiKey ? "Configured" : "Not Configured",
          },
        ]}
        actions={
          <ActionPanel>
            <Action.Push
              title="Set API Key"
              target={
                <EditProviderKey
                  providerName="Google Gemini"
                  storageKey="GEMINI_API_KEY"
                  onSave={loadKeys}
                />
              }
            />
            {geminiKey && (
              <Action
                title="Clear Key"
                onAction={async () => {
                  await LocalStorage.removeItem("GEMINI_API_KEY");
                  loadKeys();
                  showToast(Toast.Style.Success, "Cleared");
                }}
              />
            )}
          </ActionPanel>
        }
      />
      <List.Item
        title="OpenAI"
        subtitle="Provides gpt-4o, gpt-4-turbo, etc."
        icon={Icon.Globe}
        accessories={[
          {
            icon: openAiKey ? Icon.CheckCircle : Icon.Circle,
            tooltip: openAiKey ? "Configured" : "Not Configured",
          },
        ]}
        actions={
          <ActionPanel>
            <Action.Push
              title="Set API Key"
              target={
                <EditProviderKey
                  providerName="OpenAI"
                  storageKey="OPENAI_API_KEY"
                  onSave={loadKeys}
                />
              }
            />
            {openAiKey && (
              <Action
                title="Clear Key"
                onAction={async () => {
                  await LocalStorage.removeItem("OPENAI_API_KEY");
                  loadKeys();
                  showToast(Toast.Style.Success, "Cleared");
                }}
              />
            )}
          </ActionPanel>
        }
      />
    </List>
  );
}
