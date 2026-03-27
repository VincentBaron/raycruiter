import React, { useState, useEffect } from "react";
import { Grid, LocalStorage, ActionPanel, Action, Icon, useNavigation } from "@raycast/api";

const BOARDS = [
  { id: "linkedin", title: "LinkedIn", image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
  { id: "indeed", title: "Indeed", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Indeed_logo.png" },
  { id: "wttj", title: "Welcome to the Jungle", image: "https://avatars.githubusercontent.com/u/12028882?s=280&v=4" },
  { id: "monster", title: "Monster", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Monster.com_logo.svg/1200px-Monster.com_logo.svg.png" },
  { id: "glassdoor", title: "Glassdoor", image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Glassdoor_logo.svg" },
];

export default function MultiDiffusion({ jobId }: { jobId: string }) {
  const [published, setPublished] = useState<Record<string, boolean>>({});
  const { pop } = useNavigation();

  useEffect(() => {
     LocalStorage.getItem<string>(`diffusion_${jobId}`).then(res => {
        if(res) setPublished(JSON.parse(res));
     });
  }, [jobId]);

  async function toggleBoard(boardId: string) {
     const next = { ...published, [boardId]: !published[boardId] };
     setPublished(next);
     await LocalStorage.setItem(`diffusion_${jobId}`, JSON.stringify(next));
  }

  return (
    <Grid 
      columns={3} 
      inset={Grid.Inset.Large} 
      navigationTitle={`Multi-Diffusion: ${jobId}`}
      searchBarPlaceholder="Filter job boards..."
    >
       <Grid.Section title="Select Job Boards to Publish To">
          {BOARDS.map(b => {
             const isPub = published[b.id];
             return (
               <Grid.Item
                 key={b.id}
                 content={b.image}
                 title={b.title}
                 subtitle={isPub ? "Published ✅" : "Not Published ❌"}
                 actions={
                   <ActionPanel>
                     <Action 
                       title={isPub ? "Unpublish from Board" : "Publish to Board"} 
                       icon={isPub ? Icon.XmarkCircle : Icon.CheckCircle} 
                       onAction={() => toggleBoard(b.id)} 
                     />
                     <Action title="Finish & Return" icon={Icon.ChevronLeft} onAction={pop} />
                   </ActionPanel>
                 }
               />
             );
          })}
       </Grid.Section>
    </Grid>
  );
}
