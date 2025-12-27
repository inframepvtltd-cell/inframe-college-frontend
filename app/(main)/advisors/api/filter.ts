import { AdvisorItem } from "./api";

export interface FilterOptions {
  search?: string;
  role?: string;
}

// Filter advisors based on criteria
export const filterAdvisors = (
  advisors: AdvisorItem[],
  filters: FilterOptions
): AdvisorItem[] => {
  let filtered = [...advisors];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      advisor =>
        advisor.name.toLowerCase().includes(searchTerm) ||
        advisor.role.toLowerCase().includes(searchTerm) ||
        advisor.description.toLowerCase().includes(searchTerm)
    );
  }

  // Role filter
  if (filters.role) {
    filtered = filtered.filter(advisor => 
      advisor.role.toLowerCase().includes(filters.role!.toLowerCase())
    );
  }

  return filtered;
};

// Get all unique roles from advisors
export const getUniqueRoles = (advisors: AdvisorItem[]): string[] => {
  const roles = advisors.map(advisor => advisor.role);
  return [...new Set(roles)];
};

// Sort advisors by date (newest first)
export const sortAdvisorsByDate = (
  advisors: AdvisorItem[],
  order: "newest" | "oldest" = "newest"
): AdvisorItem[] => {
  return [...advisors].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return order === "newest" ? dateB - dateA : dateA - dateB;
  });
};