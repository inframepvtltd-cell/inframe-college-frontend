import { MentorItem } from "./api";

export interface FilterOptions {
  search?: string;
  role?: string;
  expertise?: string[];
}

// Filter mentors based on criteria
export const filterMentors = (
  mentors: MentorItem[],
  filters: FilterOptions
): MentorItem[] => {
  let filtered = [...mentors];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      mentor =>
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.role.toLowerCase().includes(searchTerm) ||
        mentor.description.toLowerCase().includes(searchTerm) ||
        mentor.expertise.some(skill => 
          skill.toLowerCase().includes(searchTerm)
        )
    );
  }

  // Role filter
  if (filters.role) {
    filtered = filtered.filter(mentor => 
      mentor.role.toLowerCase() === filters.role?.toLowerCase()
    );
  }

  // Expertise filter
  if (filters.expertise && filters.expertise.length > 0) {
    filtered = filtered.filter(mentor =>
      filters.expertise!.some(skill =>
        mentor.expertise.some(mentorSkill =>
          mentorSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  return filtered;
};

// Get all unique roles from mentors
export const getUniqueRoles = (mentors: MentorItem[]): string[] => {
  const roles = mentors.map(mentor => mentor.role);
  return [...new Set(roles)];
};

// Get all unique expertise from mentors
export const getUniqueExpertise = (mentors: MentorItem[]): string[] => {
  const allExpertise = mentors.flatMap(mentor => mentor.expertise);
  return [...new Set(allExpertise)];
};

// Sort mentors by date (newest first)
export const sortMentorsByDate = (
  mentors: MentorItem[],
  order: "newest" | "oldest" = "newest"
): MentorItem[] => {
  return [...mentors].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return order === "newest" ? dateB - dateA : dateA - dateB;
  });
};