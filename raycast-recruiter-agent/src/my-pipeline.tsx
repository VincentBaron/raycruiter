import { EntityList } from "./views/EntityList";
import { useMockData } from "./hooks/useMockData";

export default function Command() {
  const { deals, prospects } = useMockData();

  const activeDeals = deals.filter((d: any) => d.assignee === "Jane Doe");
  const activeProspects = prospects; // Assuming all are in Jane's pipeline

  return (
    <EntityList 
      isLoading={false} 
      deals={activeDeals} 
      jobs={[]} 
      prospects={activeProspects} 
      candidates={[]} 
      navigationTitle="My Pipeline"
    />
  );
}
