import { EntityList } from "./views/EntityList";
import { useMockData } from "./hooks/useMockData";

export default function Command() {
  const { deals, jobs, prospects, candidates } = useMockData();

  return (
    <EntityList 
      isLoading={false} 
      deals={deals} 
      jobs={jobs} 
      prospects={prospects} 
      candidates={candidates} 
      navigationTitle="Global Search"
    />
  );
}
