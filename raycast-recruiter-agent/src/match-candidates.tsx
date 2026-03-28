import React, { useState } from "react";
import { List, ActionPanel, Action, Icon, Color } from "@raycast/api";
import fs from "fs";
import path from "path";

const jemmoPayload = JSON.parse(
  fs.readFileSync(
    "/Users/vincentbaron/raycruiter/raycast-recruiter-agent/jemmo_payload.json",
    "utf8",
  ),
);

export default function MatchCandidates({
  initialJobId,
}: {
  initialJobId?: string;
}) {
  const [searchText, setSearchText] = useState("");

  const fakeNames = [
    "Alice Dupont",
    "Marc Lemoine",
    "Chloé Martin",
    "Lucas Bernard",
    "Emma Dubois",
    "Hugo Thomas",
    "Léa Robert",
    "Louis Richard",
    "Arthur Petit",
    "Camille Roux",
  ];
  const fakeTitles = [
    "Senior Recruiter",
    "Talent Acquisition Manager",
    "HR Business Partner",
    "Lead Sourcing Specialist",
  ];

  const talents = jemmoPayload.talents
    .map((t: any, index: number) => {
      if (!t.talent.first_name) {
        const parts = fakeNames[index % fakeNames.length].split(" ");
        return {
          ...t,
          talent: {
            ...t.talent,
            first_name: parts[0],
            last_name: parts[1],
            title: fakeTitles[index % fakeTitles.length],
            internal_id: `fake-id-${index}`,
            linkedin_url: "https://linkedin.com",
            email: `${parts[0].toLowerCase()}@example.com`,
          },
        };
      }
      return t;
    })
    .slice(0, 10);

  const filteredTalents = talents.filter((t: any) => {
    const term = searchText.toLowerCase();
    const name =
      `${t.talent.first_name || ""} ${t.talent.last_name || ""}`.toLowerCase();
    return name.includes(term);
  });

  return (
    <List
      isShowingDetail
      onSearchTextChange={setSearchText}
      navigationTitle="Jemmo AI Matching"
      searchBarPlaceholder="Search matched candidates..."
    >
      <List.Section
        title={`Jemmo Matches for Deal ID: ${initialJobId || jemmoPayload.job_id.slice(0, 16)}`}
        subtitle={`${talents.length} Candidates`}
      >
        {filteredTalents.map((t: any) => {
          const { talent, match_score, justification } = t;
          const fullName = `${talent.first_name} ${talent.last_name}`;
          const title = talent.title || "No Title";

          let markdown = `# ${fullName}\n\n**Current Title:** ${title}\n\n`;
          markdown += `---\n\n`;

          markdown += `### ✅ Jemmo AI Pros\n`;
          justification.pros.forEach((pro: any) => {
            markdown += `- **${pro.title}:** ${pro.description}\n`;
          });

          markdown += `\n### ⚠️ Jemmo AI Cons\n`;
          justification.cons.forEach((con: any) => {
            markdown += `- **${con.title}:** ${con.description}\n`;
          });

          return (
            <List.Item
              key={talent.internal_id}
              icon={{
                source: Icon.Stars,
                tintColor: match_score >= 90 ? Color.Green : Color.Yellow,
              }}
              title={`${fullName} — ${title}`}
              accessories={[
                {
                  text: `${match_score}% Match`,
                  icon: Icon.StarCircle,
                  tooltip: "Evaluated by Jemmo AI",
                },
              ]}
              detail={<List.Item.Detail markdown={markdown} />}
              actions={
                <ActionPanel>
                  <ActionPanel.Section title="Candidate Sharing">
                    <Action.CopyToClipboard
                      title="Copy LinkedIn Profile Link"
                      content={
                        talent.linkedin_url ||
                        `https://linkedin.com/in/${talent.first_name.toLowerCase()}-${talent.last_name.toLowerCase()}`
                      }
                      icon={Icon.Link}
                      shortcut={{ modifiers: ["cmd"], key: "s" }}
                    />
                    <Action.CopyToClipboard
                      title="Copy Jemmo Analysis"
                      content={markdown}
                      icon={Icon.CopyClipboard}
                    />
                  </ActionPanel.Section>
                  <ActionPanel.Section title="Outreach">
                    {talent.email && (
                      <Action.OpenInBrowser
                        title="Send Email"
                        url={`mailto:${talent.email}`}
                        icon={Icon.Envelope}
                      />
                    )}
                    {talent.linkedin_url && (
                      <Action.OpenInBrowser
                        title="Open LinkedIn"
                        url={talent.linkedin_url}
                        icon={Icon.Link}
                      />
                    )}
                  </ActionPanel.Section>
                </ActionPanel>
              }
            />
          );
        })}
      </List.Section>
    </List>
  );
}
