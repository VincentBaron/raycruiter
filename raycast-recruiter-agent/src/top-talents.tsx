import React, { useState } from "react";
import { List, ActionPanel, Action, Icon, Detail, useNavigation } from "@raycast/api";

const DUMMY_TALENTS = [
   { id: "1", name: "Alice Software", role: "Senior TS Engineer", signal: "Just finished Series A startup", available: true, keywords: ["React", "Typescript", "Node.js"] },
   { id: "2", name: "Bob Builder", role: "VP of Engineering", signal: "Open to Work badge added", available: true, keywords: ["Leadership", "AWS", "Python"] },
   { id: "3", name: "Carol Stack", role: "Fullstack Developer", signal: "Company laid off 10%", available: true, keywords: ["Vue", "Go", "PostgreSQL"] }
];

export default function TopTalents() {
   const { push } = useNavigation();

   return (
     <List navigationTitle="Fresh Top Talents">
        <List.Section title="High-Signal Candidates (Dummy Data)">
           {DUMMY_TALENTS.map(t => (
              <List.Item
                 key={t.id}
                 icon="extension_logo.png"
                 title={t.name}
                 subtitle={t.role}
                 accessories={[{ text: t.signal }]}
                 actions={
                    <ActionPanel>
                       <Action.Push title="Source Hiring Companies" icon={Icon.MagnifyingGlass} target={<SourceCompanies talent={t} />} />
                    </ActionPanel>
                 }
              />
           ))}
        </List.Section>
     </List>
   );
}

function SourceCompanies({ talent }: { talent: any }) {
    const markdown = `# Uncovering Target Companies for ${talent.name}
    
**Target Role:** ${talent.role}
**Market Trigger:** ${talent.signal}

---

### AI Sourcing Engine
*Scanning job boards and API signals for companies actively hiring for: ${talent.keywords.join(", ")}...*

*(Note: Data extraction from Jemmo AI will be piped here in an upcoming implementation!)*
`;

    return (
        <Detail
            navigationTitle={`Sourcing: ${talent.name}`}
            markdown={markdown}
            actions={
                <ActionPanel>
                    <Action title="Launch Full Market Scan" icon={Icon.Stars} onAction={() => {/* hook into AI later */}} />
                </ActionPanel>
            }
        />
    );
}
