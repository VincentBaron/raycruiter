import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    await showToast({ style: Toast.Style.Animated, title: "Generating Payload..." });
    
    setTimeout(async () => {
      setIsLoading(false);
      await showToast({ style: Toast.Style.Success, title: "Action executed via Jemmo API" });
    }, 1500);
  };

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Execute AI Command" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Interact with your ATS naturally. Generated leads will automatically create Prospects." />
      <Form.TextArea id="prompt" title="Ask Raycruiter" placeholder="e.g., Generate 20 leads from mid size tech startups..." autoFocus />
    </Form>
  );
}
