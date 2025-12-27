import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/mentor`;

export interface MentorItem {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  expertise: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  status: "success" | "error";
  message: string;
  data: MentorItem[] | MentorItem;
}

// Fetch all active mentors
export const fetchMentors = async (): Promise<MentorItem[]> => {
  try {
    const response = await axios.post(`${API_BASE}/fetch`, {});
    
    if (response.data.status === "success") {
      const data = response.data.data;
      // Filter only active mentors
      const mentors = Array.isArray(data) ? data : [data];
      return mentors.filter(mentor => mentor.is_active === true);
    }
    return [];
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
};

// Fetch single mentor by ID
export const getMentorById = async (id: string): Promise<MentorItem | null> => {
  try {
    const response = await axios.post(`${API_BASE}/fetch`, { id });
    
    if (response.data.status === "success" && response.data.data) {
      const data = response.data.data;
      const mentor = Array.isArray(data) ? data[0] : data;
      return mentor.is_active ? mentor : null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching mentor:", error);
    return null;
  }
};