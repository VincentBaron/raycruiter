import { LocalStorage, showToast, Toast } from "@raycast/api";

export type TriggerEvent = "Job Created" | "Candidate Sourced" | "Call Ended" | "Pipeline Moved";

export interface WebhookPayload {
  event: TriggerEvent;
  timestamp: string;
  source: "raycruiter";
  data: any;
}

export async function sendWebhook(event: TriggerEvent, data: any): Promise<boolean> {
  try {
    const webhookUrlsStr = await LocalStorage.getItem<string>("custom_webhooks") || "{}";
    const webhooks = JSON.parse(webhookUrlsStr);
    
    // Check if user mapped a URL to this exact event or has a global "all" fallback.
    const targetUrl = webhooks[event] || webhooks["all"];
    
    if (!targetUrl) {
      console.log(`No webhook configured for event: ${event}. Storing purely locally.`);
      return false; // 100% LocalStorage mode active.
    }

    const payload: WebhookPayload = {
      event,
      timestamp: new Date().toISOString(),
      source: "raycruiter",
      data
    };

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Webhook failed with status: ${res.status}`);
    }

    await showToast({ title: "Remote Sync Complete", message: `Webhook fired: ${event}`, style: Toast.Style.Success });
    return true;
  } catch (error) {
    console.error("Webhook Error:", error);
    await showToast({ title: `Remote Sync Failed`, message: String(error), style: Toast.Style.Failure });
    return false;
  }
}
