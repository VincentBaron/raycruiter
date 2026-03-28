import { EntityList } from "./views/EntityList";
import { useMockData, getFakeDueDateOffset } from "./hooks/useMockData";

export default function Command() {
  const { deals, prospects } = useMockData();

  const sortByDueDate = (a: any, b: any) => {
    const dueA = a.dueDate || getFakeDueDateOffset(a.id);
    const dueB = b.dueDate || getFakeDueDateOffset(b.id);
    return dueA - dueB;
  };

  const activeDeals = deals
    .filter((d: any) => d.assignee === "Jane Doe")
    .sort(sortByDueDate);
  const activeProspects = prospects.sort(sortByDueDate); // Assuming all are in Jane's pipeline

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
