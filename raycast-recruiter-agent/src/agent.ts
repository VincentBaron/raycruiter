import OpenAI from "openai";
import { getPreferenceValues } from "@raycast/api";


export type Candidate = {
  id: string;
  name: string;
  linkedin_url: string;
  location: string;
  skills: string[];
};

export async function sourceCandidatesAgent(query: string): Promise<Candidate[]> {
  // Simulate network delay for real UI feel
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return realistic dummy candidates based on the search
  return [
    {
      id: "c1",
      name: "Alice Dupont",
      linkedin_url: "https://linkedin.com/in/alicedupont",
      location: "Paris, France",
      skills: ["React", "TypeScript", "Node.js", "Next.js"],
    },
    {
      id: "c2",
      name: "Bob Smith",
      linkedin_url: "https://linkedin.com/in/bobsmith",
      location: "London, UK",
      skills: ["Frontend Architect", "UI/UX", "TailwindCSS"],
    },
    {
      id: "c3",
      name: "Charlie Martinez",
      linkedin_url: "https://linkedin.com/in/charliemartinez",
      location: "Berlin, Germany",
      skills: ["Vue.js", "Nuxt", "GraphQL", "Python"],
    },
  ];
}

export async function saveCandidatesToAts(candidates: Candidate[], targetJobId: string): Promise<string[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Return mock inserted IDs
  return candidates.map((c) => `inserted_${c.id}`);
}
