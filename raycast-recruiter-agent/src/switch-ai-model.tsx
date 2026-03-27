import React, { useState, useEffect } from "react";
import { List, LocalStorage, ActionPanel, Action, showToast, Toast, Icon, useNavigation, Form } from "@raycast/api";

const SUPPORTED_MODELS = [
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google Gemini", type: "gemini", icon: Icon.Stars, storageKey: "GEMINI_API_KEY" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google Gemini", type: "gemini", icon: Icon.Stars, storageKey: "GEMINI_API_KEY" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google Gemini", type: "gemini", icon: Icon.Stars, storageKey: "GEMINI_API_KEY" },
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", type: "openai", icon: Icon.Globe, storageKey: "OPENAI_API_KEY" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", type: "openai", icon: Icon.Globe, storageKey: "OPENAI_API_KEY" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", type: "openai", icon: Icon.Globe, storageKey: "OPENAI_API_KEY" }
];

function EditProviderKey({ providerName, storageKey, onSave }: { providerName: string, storageKey: string, onSave: () => void }) {
    const { pop } = useNavigation();
    
    async function handleSubmit(values: { apiKey: string }) {
        if (!values.apiKey) {
            await LocalStorage.removeItem(storageKey);
        } else {
            await LocalStorage.setItem(storageKey, values.apiKey);
        }
        showToast({ style: Toast.Style.Success, title: `${providerName} Key Saved` });
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
            <Form.Description text={`Enter your exact API key for ${providerName} below.`} />
            <Form.PasswordField id="apiKey" title="API Key" placeholder="sk-..." />
        </Form>
    );
}

export default function SwitchAiModel() {
    const [activeModel, setActiveModel] = useState<string>("gpt-4o");
    const [hasGemini, setHasGemini] = useState(false);
    const [hasOpenAi, setHasOpenAi] = useState(false);

    async function load() {
        const m = await LocalStorage.getItem<string>("ACTIVE_AI_MODEL");
        if (m) setActiveModel(m);
        const gk = await LocalStorage.getItem<string>("GEMINI_API_KEY");
        const ok = await LocalStorage.getItem<string>("OPENAI_API_KEY");
        setHasGemini(!!gk);
        setHasOpenAi(!!ok);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleSelect(id: string) {
        await LocalStorage.setItem("ACTIVE_AI_MODEL", id);
        setActiveModel(id);
        showToast({ style: Toast.Style.Success, title: "Model Changed", message: `Active Model is now ${id}` });
    }

    return (
        <List searchBarPlaceholder="Search Models...">
            {SUPPORTED_MODELS.map(m => {
                const isReady = (m.type === "gemini" && hasGemini) || (m.type === "openai" && hasOpenAi);
                return (
                    <List.Item
                        key={m.id}
                        title={m.name}
                        subtitle={m.provider}
                        icon={m.icon}
                        accessories={[
                            ...(!isReady ? [{ icon: Icon.LockDisabled, tooltip: "Missing API Key" }] : []),
                            ...(activeModel === m.id ? [{ icon: Icon.CheckCircle, tooltip: "Active Model" }] : [])
                        ]}
                        actions={
                            <ActionPanel>
                                {isReady ? (
                                    <Action title="Select Model" icon={Icon.Check} onAction={() => handleSelect(m.id)} />
                                ) : (
                                    <Action.Push title="Set API Key" icon={Icon.Key} target={<EditProviderKey providerName={m.provider} storageKey={m.storageKey} onSave={load} />} />
                                )}
                            </ActionPanel>
                        }
                    />
                );
            })}
        </List>
    );
}
