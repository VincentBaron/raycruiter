import React, { useState } from "react";
import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";

export default function CreateDeal() {
  const { pop } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: { title: string; pipeline_id: string; stage_id: string }) {
    setIsLoading(true);
    
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Creating Deal...",
    });

    try {
      // Simulate API Call to Synced DB via MCP
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.style = Toast.Style.Success;
      toast.title = "Deal Created";
      toast.message = `${values.title} added to Pipeline ${values.pipeline_id}, Stage ${values.stage_id}`;
      
      // Go back to previous screen (or close form)
      pop();
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to create deal";
      toast.message = String(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Deal" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Deal Title" placeholder="e.g. Acme Corp Hiring 2024" autoFocus />
      
      <Form.Dropdown id="pipeline_id" title="Pipeline" defaultValue="1">
        <Form.Dropdown.Item value="1" title="Pipeline 1 (Standard Software)" />
        <Form.Dropdown.Item value="2" title="Pipeline 2 (Executive Search)" />
      </Form.Dropdown>

      <Form.Dropdown id="stage_id" title="Initial Stage" defaultValue="1">
        <Form.Dropdown.Item value="1" title="Stage 1: Discovery" />
        <Form.Dropdown.Item value="2" title="Stage 2: Pitching" />
        <Form.Dropdown.Item value="3" title="Stage 3: Proposal Sent" />
        <Form.Dropdown.Item value="4" title="Stage 4: Negotiation" />
        <Form.Dropdown.Item value="5" title="Stage 5: Won" />
      </Form.Dropdown>

      <Form.Separator />
      
      <Form.TextField id="value" title="Expected Value (€)" placeholder="e.g. 50000" />
      <Form.TextField id="website" title="Company Website" placeholder="https://..." />
    </Form>
  );
}
