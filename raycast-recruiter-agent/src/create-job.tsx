import React, { useState } from "react";
import { Form, ActionPanel, Action, showToast, Toast, useNavigation, Icon } from "@raycast/api";
import MultiDiffusion from "./multi-diffusion";

const jobPayload = require("../../dummy_job_payload_creation.json");

export default function CreateJobFromDeal(props: { defaultDealName?: string }) {
  const { pop, push } = useNavigation();
  const v = jobPayload.vacancy;

  // Attempt to strip basic HTML for the text area since Raycast Form.TextArea takes raw string.
  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

  const [title, setTitle] = useState(props.defaultDealName || v.title || "");
  const [description, setDescription] = useState(stripHtml(v.description || ""));
  const [mission, setMission] = useState(stripHtml(v.mission || ""));
  const [profile, setProfile] = useState(stripHtml(v.profile || ""));

  async function handleSubmit() {
    await showToast({ style: Toast.Style.Animated, title: "Creating ATS Job Posting..." });
    
    // Simulate API Call bridging Deal -> ATS Job
    await new Promise((r) => setTimeout(r, 800));

    await showToast({ 
      style: Toast.Style.Success, 
      title: "Job Selected!", 
      message: `${title} was transferred successfully to ATS.`
    });
    push(<MultiDiffusion jobId={title} />);
  }

  return (
    <Form
      navigationTitle="Transfer Deal to ATS Job Posting"
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Job & Configure Multi-Diffusion" icon={Icon.Upload} onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField 
        id="title" 
        title="Job Title" 
        placeholder="e.g. Senior Data Engineer" 
        value={title} 
        onChange={setTitle} 
      />
      
      <Form.Separator />
      
      <Form.TextArea 
        id="description" 
        title="General Description" 
        placeholder="Describe the company and context..." 
        value={description} 
        onChange={setDescription} 
        enableMarkdown
      />
      
      <Form.TextArea 
        id="mission" 
        title="Missions & Responsibilities" 
        value={mission} 
        onChange={setMission} 
        enableMarkdown
      />
      
      <Form.TextArea 
        id="profile" 
        title="Required Profile" 
        value={profile} 
        onChange={setProfile} 
        enableMarkdown
      />
    </Form>
  );
}
