import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useState } from "react";

const boards = [
  { id: "meteojob", name: "Meteojob", active: true },
  { id: "hellowork", name: "HelloWork", active: false },
  { id: "linkedin", name: "LinkedIn", active: true },
  { id: "indeed", name: "Indeed", active: false },
];

export default function Command() {
  const [items, setItems] = useState(boards);

  const toggleBoard = (id: string) => {
    setItems(items.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));
  };

  return (
    <List navigationTitle="Multi-Diffusion Boards">
      {items.map((board) => (
        <List.Item
          key={board.id}
          title={board.name}
          icon={
            board.active
              ? { source: Icon.CheckCircle, tintColor: "green" }
              : { source: Icon.Circle, tintColor: "gray" }
          }
          accessories={[{ text: board.active ? "Active" : "Inactive" }]}
          actions={
            <ActionPanel>
              <Action
                title={board.active ? "Disable Board" : "Enable Board"}
                icon={Icon.Power}
                onAction={() => toggleBoard(board.id)}
              />
              <Action.OpenInBrowser
                title="Open Board Website"
                url={`https://www.${board.id}.com`}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
