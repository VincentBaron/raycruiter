import { List, Icon } from "@raycast/api";
import { DealActions } from "./actions/DealActions";
import { JobActions } from "./actions/JobActions";
import { ProspectActions } from "./actions/ProspectActions";
import { CandidateActions } from "./actions/CandidateActions";
import { EntityTag } from "./Tag";
import { SignalStrengthIcon, CandidateScoreIcon, StatusIcon } from "./icons";

interface EntityProps {
  type: "Deal" | "Job" | "Prospect" | "Candidate";
  data: any;
}

export function EntityListItem({ type, data }: EntityProps) {
  let title = data.name || data.title;
  let subtitle = data.clientName || data.company || "";
  let icon: any = Icon.Circle;
  let accessories: List.Item.Accessory[] = [EntityTag({ type: type as any })];
  let ActionsComponent = null;

  switch (type) {
    case "Deal":
      icon = SignalStrengthIcon({ strength: ["won", "open"].includes(data.status) ? "high" : "low" });
      if (data.assignee) accessories.unshift({ text: data.assignee, icon: Icon.Person });
      ActionsComponent = <DealActions deal={data} />;
      break;

    case "Job":
      icon = SignalStrengthIcon({ strength: data.status === "open" ? "medium" : "low" });
      subtitle = `${data.location} • ${data.salary}`;
      ActionsComponent = <JobActions job={data} />;
      break;

    case "Prospect":
      icon = SignalStrengthIcon({ strength: data.signalStrength });
      if (data.email) accessories.unshift({ tooltip: data.email, icon: Icon.Envelope });
      ActionsComponent = <ProspectActions prospect={data} />;
      break;

    case "Candidate":
      icon = SignalStrengthIcon({ strength: ["hired", "offer", "interview"].includes(data.stage) ? "high" : "medium" });
      subtitle = `Applied: ${new Date(data.appliedAt).toLocaleDateString()}`;
      accessories.unshift({ text: data.stage.toUpperCase() });
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
