import { useCachedPromise } from "@raycast/utils";
import { EntityList } from "./views/EntityList";

import mockDeals from "./data/mockDeals.json";
import mockProspects from "./data/mockProspects.json";

export default function Command() {
  // In a real app, this would fetch data filtered by the currentUser's ID
  const { isLoading: isLoadingDeals, data: deals } = useCachedPromise(async () => mockDeals.filter(d => d.assignee === "Jane Doe"), []);
  const { isLoading: isLoadingProspects, data: prospects } = useCachedPromise(async () => mockProspects, []); // Assuming all are in Jane's pipeline for mock

  const isLoading = isLoadingDeals || isLoadingProspects;

  return (
    <EntityList 
      isLoading={isLoading} 
      deals={deals || []} 
      jobs={[]} 
      prospects={prospects || []} 
      candidates={[]} 
      navigationTitle="My Pipeline"
    />
  );
}
