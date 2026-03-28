import { Color, List } from "@raycast/api";

export function EntityTag({
  type,
}: {
  type: "Deal" | "Job" | "Prospect" | "Candidate" | "Client";
}) {
  let color = Color.SecondaryText;
  switch (type) {
    case "Client":
      color = Color.Green;
      break;
    case "Prospect":
      color = Color.Blue;
      break;
    case "Deal":
      color = Color.Purple;
      break;
    case "Job":
      color = Color.Orange;
      break;
    case "Candidate":
      color = Color.Red;
      break;
  }

  return { tag: { value: type, color } };
}
