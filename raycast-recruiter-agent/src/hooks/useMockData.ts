import { useCachedState } from "@raycast/utils";

// Make sure to parse/stringify safely if needed, but useCachedState handles objects nicely.
import initialDeals from "../data/mockDeals.json";
import initialJobs from "../data/mockJobs.json";
import initialProspects from "../data/mockProspects.json";
import initialCandidates from "../data/mockCandidates.json";

export function useMockData() {
  const [deals, setDeals] = useCachedState<any[]>("mockDeals", initialDeals);
  const [jobs, setJobs] = useCachedState<any[]>("mockJobs", initialJobs);
  const [prospects, setProspects] = useCachedState<any[]>("mockProspects", initialProspects);
  const [candidates, setCandidates] = useCachedState<any[]>("mockCandidates", initialCandidates);

  return { deals, setDeals, jobs, setJobs, prospects, setProspects, candidates, setCandidates };
}
