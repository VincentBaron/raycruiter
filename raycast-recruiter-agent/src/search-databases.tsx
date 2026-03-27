import { EntityList } from "./views/EntityList";
import { useMockData, getFakeDueDateOffset } from "./hooks/useMockData";

export default function Command() {
  const { deals, jobs, prospects, candidates } = useMockData();

  const sortByDueDate = (a: any, b: any) => {
    const dueA = a.dueDate || getFakeDueDateOffset(a.id);
    const dueB = b.dueDate || getFakeDueDateOffset(b.id);
    return dueA - dueB;
  };

  return (
    <EntityList 
      isLoading={false} 
      deals={[...deals].sort(sortByDueDate)} 
      jobs={[...jobs].sort(sortByDueDate)} 
      prospects={[...prospects].sort(sortByDueDate)} 
      candidates={[...candidates].sort(sortByDueDate)} 
      navigationTitle="Global Search"
    />
  );
}
