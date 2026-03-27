import { Detail, ActionPanel, Action } from "@raycast/api";

export function EntityDetail({ type, data }: { type: string, data: any }) {
  const title = data.name || data.title;
  let markdown = `# ${title}\n\n`;

  if (type === "Deal") {
    markdown += `**Client**: ${data.clientName}\n**Assignee**: ${data.assignee || "Unassigned"}\n**Status**: ${data.status.toUpperCase()}\n\n---\n\n### Context\nThis deal is actively being worked on. Call scheduled for next week.`;
  } else if (type === "Job") {
    markdown += `**Job Title**: ${data.title}\n**Location**: ${data.location}\n**Salary**: ${data.salary}\n**Status**: ${data.status.toUpperCase()}\n\n---\n\n### Job Description\nWe are looking for a rockstar ${data.title} to join our fast-paced team.`;
  } else if (type === "Prospect") {
    markdown += `**Company**: ${data.company}\n**Email**: ${data.email || "N/A"}\n**Signal Strength**: ${data.signalStrength.toUpperCase()}\n\n---\n\n### Prospect Notes\nGenerated from recent activity. Ready for outbound sequence.`;
  } else if (type === "Candidate") {
    markdown += `**Stage**: ${data.stage.toUpperCase()}\n**Score**: ${data.score}/100\n**Applied**: ${new Date(data.appliedAt).toLocaleDateString()}\n**Email**: ${data.email}\n\n---\n\n### Candidate Summary\nStrong applicant matching the core criteria of the role.`;
  }

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Type" text={type} />
          {data.status && <Detail.Metadata.Label title="Status" text={data.status} />}
          {data.score && <Detail.Metadata.Label title="Score" text={String(data.score)} />}
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
           <Action.OpenInBrowser title="Open in Application" url={`https://your-ats-app.com/${type.toLowerCase()}/${data.id}`} shortcut={{ modifiers: [], key: "enter" }} />
           <Action.CopyToClipboard title="Copy ID" content={data.id} shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} />
        </ActionPanel>
      }
    />
  );
}
