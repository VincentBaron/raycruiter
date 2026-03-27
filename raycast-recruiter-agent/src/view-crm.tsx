import React, { useState, useMemo, useEffect } from "react";
import { List, ActionPanel, Action, Icon, Color, LocalStorage, showToast, Toast } from "@raycast/api";
import fs from "fs";
import path from "path";
import { DealDetail } from "./deal-components";
import CreateJobFromDeal from "./create-job";
import MatchCandidates from "./match-candidates";

interface Deal {
  id: string;
  title: string;
  status: string;
  value: number;
  date: string;
  pipeline_id: number;
  stage_id: number;
  website?: string | null;
  linkedin?: string | null;
  shortId?: string;
  next_activity_date?: string | null;
}

export default function CrmView() {
  const [searchText, setSearchText] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState<string>("all");
  const [diffused, setDiffused] = useState<Record<string, boolean>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const dealsData = JSON.parse(fs.readFileSync("/Users/vincentbaron/raycruiter/raycast-recruiter-agent/src/deals.json", "utf8"));

  useEffect(() => {
    async function load() {
      const rec: Record<string, boolean> = {};
      for (const d of dealsData) {
        const val = await LocalStorage.getItem(`diffused_deal_${d.id}`);
        if (val) rec[d.id] = true;
      }
      setDiffused(rec);
    }
    load();
  }, []);

  async function toggleDiffused(dealId: string) {
    const nextVal = !diffused[dealId];
    setDiffused({ ...diffused, [dealId]: nextVal });
    if (nextVal) {
      await LocalStorage.setItem(`diffused_deal_${dealId}`, "true");
      showToast({ style: Toast.Style.Success, title: "Deal Diffused 📢" });
    } else {
      await LocalStorage.removeItem(`diffused_deal_${dealId}`);
      showToast({ style: Toast.Style.Success, title: "Diffusion Removed" });
    }
  }

  const dealsWithIds = useMemo(() => {
    return dealsData.map((d: any, i: number) => ({ ...d, shortId: `d${i + 1}` }));
  }, []);

  const filteredDeals = useMemo(() => {
    return dealsWithIds.filter((deal: any) => {
      // Filter by pipeline
      if (selectedPipeline !== "all" && deal.pipeline_id?.toString() !== selectedPipeline) {
        return false;
      }

      const term = searchText.toLowerCase();
      return (
        (deal.title || "").toLowerCase().includes(term) ||
        deal.shortId.includes(term)
      );
    }) as Deal[];
  }, [searchText, dealsWithIds]);

  // Group by Pipeline and Stage to show Kanban structure natively in one simple view
  const groupedDeals = useMemo(() => {
    const groups: Record<string, Deal[]> = {};
    filteredDeals.forEach((deal) => {
      const groupKey = `Pipeline ${deal.pipeline_id} - Stage ${deal.stage_id}`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(deal);
    });
    return groups;
  }, [filteredDeals]);

  // Sort the keys so they appear in sequential order
  const sortedGroupKeys = Object.keys(groupedDeals).sort();

  return (
    <List
      isShowingDetail
      navigationTitle="Deals Pipelines"
      searchBarPlaceholder="Search pipeline deals..."
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown tooltip="Select Deals Pipeline" value={selectedPipeline} onChange={setSelectedPipeline}>
          <List.Dropdown.Item title="All Deals Pipelines" value="all" icon={Icon.List} />
          <List.Dropdown.Item title="Engineering Search" value="1" icon={Icon.Terminal} />
          <List.Dropdown.Item title="Executive Placement" value="2" icon={Icon.Person} />
          <List.Dropdown.Item title="Graduate Pipeline" value="3" icon={Icon.Book} />
        </List.Dropdown>
      }
    >
      {sortedGroupKeys.map((groupKey) => {
        const dealsInGroup = groupedDeals[groupKey];
        const isExpanded = expandedGroups[groupKey];
        const displayedDeals = isExpanded ? dealsInGroup : dealsInGroup.slice(0, 3);
        const hasMore = dealsInGroup.length > 3;

        return (
          <List.Section
            key={groupKey}
            title={groupKey}
            subtitle={`${dealsInGroup.length} Deals`}
          >
            {displayedDeals.map((deal) => {
              const formattedDate = new Date(deal.date).toLocaleDateString();

              const accessories: List.Item.Accessory[] = [];

              if (diffused[deal.id]) {
                accessories.push({ text: "Diffused", icon: { source: Icon.Megaphone, tintColor: Color.Green } });
              }

              if (deal.next_activity_date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const activityDate = new Date(deal.next_activity_date);
                activityDate.setHours(0, 0, 0, 0);

                const diffTime = activityDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let icon: Icon = Icon.Calendar;
                let color: Color = Color.PrimaryText;
                let text = "Activity";

                if (diffDays < 0) {
                  text = "Past Due";
                  icon = Icon.Warning;
                  color = Color.Red;
                } else if (diffDays === 0) {
                  text = "Due Today";
                  icon = Icon.Clock;
                  color = Color.Orange;
                } else {
                  text = `In ${diffDays}d`;
                  icon = Icon.Calendar;
                  color = Color.Green;
                }

                accessories.push({
                  text: text,
                  icon: { source: icon, tintColor: color },
                  tooltip: `Next Activity: ${activityDate.toLocaleDateString()}`
                });
              } else {
                accessories.push({
                  text: "No Activity",
                  icon: { source: Icon.MinusCircle, tintColor: Color.SecondaryText }
                });
              }

              accessories.push(
                { text: `€${deal.value || 0}`, icon: Icon.Coins }
              );

              if (deal.linkedin) {
                accessories.unshift({ icon: Icon.Link, tooltip: deal.linkedin });
              }

              return (
                <List.Item
                  key={deal.id}
                  icon={{ source: Icon.Dot, tintColor: Color.Blue }}
                  title={`[${deal.shortId}] ${deal.title}`}
                  subtitle={deal.website || ""}
                  accessories={accessories}
                  actions={
                    <ActionPanel>
                      <Action.Push
                        title="View Full Deal Details"
                        icon={Icon.Eye}
                        target={<DealDetail deal={deal} isDiffused={diffused[deal.id]} onToggleDiffused={() => toggleDiffused(deal.id)} />}
                      />
                      <ActionPanel.Section title="Accelerators">
                        <Action
                          title={diffused[deal.id] ? "Mark as Not Diffused" : "Mark as Diffused"}
                          icon={diffused[deal.id] ? Icon.XmarkCircle : Icon.Megaphone}
                          onAction={() => toggleDiffused(deal.id)}
                          shortcut={{ modifiers: ["cmd"], key: "d" }}
                        />
                        <Action.Push
                          title="Match Candidates (Jemmo AI)"
                          icon={Icon.Stars}
                          target={<MatchCandidates initialJobId={deal.id} />}
                          shortcut={{ modifiers: ["cmd"], key: "m" }}
                        />
                        <Action.Push
                          title="Transfer to ATS (Create Job)"
                          icon={Icon.List}
                          target={<CreateJobFromDeal defaultDealName={deal.title} />}
                          shortcut={{ modifiers: ["cmd"], key: "t" }}
                        />
                      </ActionPanel.Section>
                      <ActionPanel.Section>
                        {deal.linkedin && (
                          <Action.OpenInBrowser
                            title="Open LinkedIn"
                            url={deal.linkedin}
                            shortcut={{ modifiers: ["cmd"], key: "l" }}
                          />
                        )}
                        {deal.website && (
                          <Action.OpenInBrowser
                            title="Open Website"
                            url={deal.website.startsWith("http") ? deal.website : `https://${deal.website}`}
                          />
                        )}
                      </ActionPanel.Section>
                      <ActionPanel.Section>
                        <Action.CopyToClipboard
                          title="Copy Deal Title"
                          content={deal.title}
                          shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                        />
                      </ActionPanel.Section>
                    </ActionPanel>
                  }
                />
              );
            })}
            {!isExpanded && hasMore && (
              <List.Item
                key={`expand-${groupKey}`}
                title={`Show ${dealsInGroup.length - 3} more...`}
                icon={Icon.ChevronDown}
                actions={
                  <ActionPanel>
                    <Action
                      title="Expand Pipeline"
                      icon={Icon.ArrowsExpand}
                      onAction={() => setExpandedGroups({ ...expandedGroups, [groupKey]: true })}
                      shortcut={{ modifiers: ["cmd"], key: "e" }}
                    />
                  </ActionPanel>
                }
              />
            )}
            {isExpanded && hasMore && (
              <List.Item
                key={`collapse-${groupKey}`}
                title="Show fewer..."
                icon={Icon.ChevronUp}
                actions={
                  <ActionPanel>
                    <Action
                      title="Collapse Pipeline"
                      icon={Icon.ArrowsExpand}
                      onAction={() => setExpandedGroups({ ...expandedGroups, [groupKey]: false })}
                      shortcut={{ modifiers: ["cmd"], key: "e" }}
                    />
                  </ActionPanel>
                }
              />
            )}
          </List.Section>
        );
      })}
    </List>
  );
}
