import { List, Icon, Image, Color } from "@raycast/api";
import { DealActions } from "./actions/DealActions";
import { JobActions } from "./actions/JobActions";
import { ProspectActions } from "./actions/ProspectActions";
import { CandidateActions } from "./actions/CandidateActions";
import { SignalStrengthIcon } from "./icons";
import { getFakeDueDateOffset } from "../hooks/useMockData";

interface EntityProps {
  type: "Deal" | "Job" | "Prospect" | "Candidate";
  data: any;
}

const getAvatar = (name: string) => {
  if (name.includes("Marie"))
    return { source: "marie.png", mask: Image.Mask.Circle };
  if (name.includes("Alex"))
    return { source: "alex.jpeg", mask: Image.Mask.Circle };
  if (name.includes("Jane"))
    return { source: "1747670127259.jpeg", mask: Image.Mask.Circle };
  return Icon.PersonCircle;
};

export function EntityListItem({ type, data }: EntityProps) {
  let title = data.name || data.title;
  let subtitle = data.clientName || data.company || "";
  let icon: any = Icon.Circle;

  const actionIcon =
    type === "Prospect"
      ? Icon.Envelope
      : type === "Candidate"
        ? Icon.Phone
        : Icon.Calendar;

  const daysDiff = data.dueDate ? data.dueDate : getFakeDueDateOffset(data.id);

  let dateText = "";
  let dateColor: Color.ColorLike = Color.Blue;

  if (daysDiff < 0) {
    dateText = `${Math.abs(daysDiff)}d`;
    dateColor = Color.Red;
  } else if (daysDiff === 0) {
    dateText = "Today";
    dateColor = Color.Green;
  } else {
    dateText = `${daysDiff}d`;
    dateColor = Color.Blue;
  }

  const rawDate = data.createdAt || data.appliedAt;
  const createdStr = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Today";
  const assignee =
    data.assignee || (type === "Candidate" ? "Marie" : "Alex Recruiter");

  let accessories: List.Item.Accessory[] = [
    { icon: actionIcon, tooltip: "Next Action Type" },
    {
      text: dateText,
      icon: { source: Icon.CircleFilled, tintColor: dateColor },
      tooltip: "Due Date",
    },
    { text: createdStr, tooltip: "Created" },
    { icon: getAvatar(assignee), tooltip: `Assignee: ${assignee}` },
  ];

  let ActionsComponent = null;

  switch (type) {
    case "Deal":
      icon = SignalStrengthIcon({
        strength: ["won", "open"].includes(data.status) ? "high" : "low",
      });
      ActionsComponent = <DealActions deal={data} />;
      break;

    case "Job":
      icon = SignalStrengthIcon({
        strength: data.status === "open" ? "medium" : "low",
      });
      subtitle = `${data.location} • ${data.salary}`;
      ActionsComponent = <JobActions job={data} />;
      break;

    case "Prospect":
      icon = SignalStrengthIcon({ strength: data.signalStrength });
      ActionsComponent = <ProspectActions prospect={data} />;
      break;

    case "Candidate":
      icon = SignalStrengthIcon({
        strength: ["hired", "offer", "interview"].includes(data.stage)
          ? "high"
          : "medium",
      });
      subtitle = `Applied: ${createdStr}`;
      ActionsComponent = <CandidateActions candidate={data} />;
      break;
  }

  return (
    <List.Item
      title={title}
      subtitle={subtitle}
      icon={icon}
      accessories={accessories}
      actions={ActionsComponent}
    />
  );
}
