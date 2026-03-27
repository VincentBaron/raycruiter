import React, { useState, useEffect } from "react";
import { Grid, ActionPanel, Action, Icon, Color, LocalStorage, Form, useNavigation, showToast, Toast } from "@raycast/api";
import SwitchAiModel from "./switch-ai-model";

type IntegrationsState = {
  pipedrive: boolean;
  mantiks: boolean;
  flatchr: boolean;
  kalent: boolean;
  raycruiter: boolean;
};

export default function ConfigureIntegrations() {
  const { push } = useNavigation();
  const [status, setStatus] = useState<IntegrationsState>({ pipedrive: false, mantiks: false, flatchr: false, kalent: false, raycruiter: false });
  const [hasWebhook, setHasWebhook] = useState(false);

  useEffect(() => {
    async function loadStatus() {
      const pd = await LocalStorage.getItem("PIPEDRIVE_API_KEY");
      const mk = await LocalStorage.getItem("MANTIKS_API_KEY");
      const fl = await LocalStorage.getItem("FLATCHR_API_KEY");
      const kt = await LocalStorage.getItem("KALENT_API_KEY");
      const rc = await LocalStorage.getItem("RAYCRUITER_LICENSE_KEY");
      const wh = await LocalStorage.getItem("custom_webhooks");

      setStatus({
        pipedrive: !!pd,
        mantiks: !!mk,
        flatchr: !!fl,
        kalent: !!kt,
        raycruiter: !!rc,
      });
      setHasWebhook(!!wh);
    }
    loadStatus();
  }, []);

  return (
    <Grid
      navigationTitle="Integrations Hub"
      columns={4}
      inset={Grid.Inset.Zero}
    >
      <Grid.Section
        title="Settings & Tools"
        subtitle="Manage Models and Webhooks"
      >
        <Grid.Item
          content={Icon.Stars}
          title="AI Providers"
          subtitle="Manage API Keys & Models"
          actions={
            <ActionPanel>
              <Action title="Configure AI Models" onAction={() => push(<SwitchAiModel />)} />
            </ActionPanel>
          }
        />
        <Grid.Item
          content={Icon.Link}
          title="Custom Webhooks"
          subtitle={hasWebhook ? "Active ✅" : "Not Configured"}
          actions={
            <ActionPanel>
              <Action title="Configure Webhooks" onAction={() => push(<ConfigureWebhooks onSave={() => setHasWebhook(true)} />)} />
            </ActionPanel>
          }
        />
      </Grid.Section>

      <Grid.Section
        title="Connected Systems"
        subtitle="Click an integration to securely configure your API keys."
      >
        <Grid.Item
          content="extension_logo.png"
          title="Raycruiter Pro"
          subtitle={status.raycruiter ? "License Active ✅" : "Unlock Needed"}
          actions={
            <ActionPanel>
              <Action title="Enter Premium License Key" onAction={() => push(<ApiKeyForm tool="Raycruiter" title="Raycruiter License Key" storageKey="RAYCRUITER_LICENSE_KEY" />)} />
            </ActionPanel>
          }
        />
        <Grid.Item
          content="pipedrive.png"
          title="Pipedrive (CRM)"
          subtitle={status.pipedrive ? "Connected ✅" : "Not Configured"}
          actions={
            <ActionPanel>
              <Action title="Configure Pipedrive" onAction={() => push(<ApiKeyForm tool="pipedrive" title="Pipedrive API Key" storageKey="PIPEDRIVE_API_KEY" />)} />
            </ActionPanel>
          }
        />
        <Grid.Item
          content="mantiks.jpeg"
          title="Mantiks (Sourcing Prospects)"
          subtitle={status.mantiks ? "Connected ✅" : "Not Configured"}
          actions={
            <ActionPanel>
              <Action title="Configure Mantiks" onAction={() => push(<ApiKeyForm tool="mantiks" title="Mantiks API Key" storageKey="MANTIKS_API_KEY" />)} />
            </ActionPanel>
          }
        />
        <Grid.Item
          content="flatchr_logo.jpeg"
          title="Flatchr (ATS)"
          subtitle={status.flatchr ? "Connected ✅" : "Not Configured"}
          actions={
            <ActionPanel>
              <Action title="Configure Flatchr" onAction={() => push(<ApiKeyForm tool="flatchr" title="Flatchr API Key" storageKey="FLATCHR_API_KEY" />)} />
            </ActionPanel>
          }
        />
        <Grid.Item
          content="kalent.jpeg"
          title="Kalent (MCP Server)"
          subtitle={status.kalent ? "Connected ✅" : "Not Configured"}
          actions={
            <ActionPanel>
              <Action title="Configure Kalent" onAction={() => push(<ApiKeyForm tool="kalent" title="Kalent API Key" storageKey="KALENT_API_KEY" />)} />
            </ActionPanel>
          }
        />
      </Grid.Section>
    </Grid>
  );
}

function ApiKeyForm({ tool, title, storageKey }: { tool: string; title: string; storageKey: string }) {
  const { pop } = useNavigation();
  const [val, setVal] = useState("");

  useEffect(() => {
    LocalStorage.getItem<string>(storageKey).then((v) => setVal(v || ""));
  }, [storageKey]);

  async function handleSave() {
    if (!val) {
      await LocalStorage.removeItem(storageKey);
    } else {
      await LocalStorage.setItem(storageKey, val);
    }
    await showToast({ style: Toast.Style.Success, title: "Configuration Saved", message: `${tool} integration updated.` });
    pop();
  }

  return (
    <Form
      navigationTitle={`Configure ${tool}`}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Configuration" onSubmit={handleSave} />
        </ActionPanel>
      }
    >
      <Form.PasswordField
        id="apikey"
        title={title}
        value={val}
        onChange={setVal}
        placeholder={`Paste your ${tool} secret API token here...`}
      />
      <Form.Description text="Your API keys are stored entirely securely within Raycast's encrypted local keychain. They are never transmitted outside of direct requests to the SaaS providers." />
    </Form>
  );
}

function ConfigureWebhooks({ onSave }: { onSave: () => void }) {
  const { pop } = useNavigation();
  const [val, setVal] = useState("");

  useEffect(() => {
    LocalStorage.getItem<string>("custom_webhooks").then((v) => {
      if (v) {
        const parsed = JSON.parse(v);
        setVal(parsed["all"] || "");
      }
    });
  }, []);

  async function handleSave() {
    if (!val) {
      await LocalStorage.removeItem("custom_webhooks");
    } else {
      await LocalStorage.setItem("custom_webhooks", JSON.stringify({ "all": val }));
    }
    await showToast({ style: Toast.Style.Success, title: "Webhooks Saved" });
    onSave();
    pop();
  }

  return (
    <Form
      navigationTitle="Configure Custom Webhook"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Webhook" onSubmit={handleSave} />
        </ActionPanel>
      }
    >
      <Form.Description text="These Webhooks unlock the 'Premium' tier remote sync capability. If configured, actions will push payloads here instead of staying pure-local." />
      <Form.TextField
        id="webhookUrl"
        title="Global Webhook URL"
        value={val}
        onChange={setVal}
        placeholder="https://hooks.zapier.com/hooks/catch/..."
      />
    </Form>
  );
}
