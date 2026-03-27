import { useCachedPromise } from "@raycast/utils";
import { EntityList } from "./views/EntityList";

import mockDeals from "./data/mockDeals.json";
import mockJobs from "./data/mockJobs.json";
import mockProspects from "./data/mockProspects.json";
import mockCandidates from "./data/mockCandidates.json";

export default function Command() {
  const { isLoading: isLoadingDeals, data: deals } = useCachedPromise(async () => mockDeals, []);
  const { isLoading: isLoadingJobs, data: jobs } = useCachedPromise(async () => mockJobs, []);
  const { isLoading: isLoadingProspects, data: prospects } = useCachedPromise(async () => mockProspects, []);
  const { isLoading: isLoadingCandidates, data: candidates } = useCachedPromise(async () => mockCandidates, []);

  const isLoading = isLoadingDeals || isLoadingJobs || isLoadingProspects || isLoadingCandidates;

  return (
    <EntityList 
      isLoading={isLoading} 
      deals={deals || []} 
      jobs={jobs || []} 
      prospects={prospects || []} 
      candidates={candidates || []} 
      navigationTitle="Global Search"
    />
  );
}
