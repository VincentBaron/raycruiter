import { Icon, Color } from "@raycast/api";

export function SignalStrengthIcon({ strength }: { strength: "high" | "medium" | "low" }) {
  switch (strength) {
    case "high":
      return { source: Icon.ArrowUp, tintColor: Color.Red };
    case "medium":
      return { source: Icon.ArrowRight, tintColor: Color.Yellow };
    case "low":
      return { source: Icon.ArrowDown, tintColor: Color.Blue };
    default:
      return { source: Icon.Minus, tintColor: Color.SecondaryText };
  }
}

export function CandidateScoreIcon({ score }: { score: "empty" | "quarter" | "half" | "full" }) {
  switch (score) {
    case "full":
      return { source: Icon.CircleFilled, tintColor: Color.Green };
    case "half":
      return { source: Icon.CircleProgress75, tintColor: Color.Yellow };
    case "quarter":
      return { source: Icon.CircleProgress25, tintColor: Color.Orange };
    case "empty":
    default:
      return { source: Icon.Circle, tintColor: Color.SecondaryText };
  }
}

export function StatusIcon({ status }: { status: "open" | "closed" | "won" | "lost" }) {
  switch (status) {
    case "won":
      return { source: Icon.CheckCircle, tintColor: Color.Green };
    case "lost":
      return { source: Icon.XMarkCircle, tintColor: Color.Red };
    case "closed":
      return { source: Icon.LockDisabled, tintColor: Color.SecondaryText };
    case "open":
    default:
      return { source: Icon.CircleProgress50, tintColor: Color.Blue };
  }
}
