// app/advisors/api/api.ts
import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/advisor`;

export interface AdvisorItem {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  status: "success" | "error";
  message: string;
  data: AdvisorItem[] | AdvisorItem;
}

// Fetch all active advisors
export const fetchAdvisors = async (): Promise<AdvisorItem[]> => {
  try {
    console.log("Fetching advisors from:", `${API_BASE}/fetch`);
    
    const response = await axios.post(`${API_BASE}/fetch`, {}, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log("API Response:", response.data);
    
    if (response.data.status === "success") {
      const data = response.data.data;
      // Filter only active advisors
      const advisors = Array.isArray(data) ? data : [data];
      return advisors.filter(advisor => advisor.is_active === true);
    }
    return [];
  } catch (error: any) {
    console.error("Error fetching advisors:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    return [];
  }
};

// Fetch single advisor by ID
export const getAdvisorById = async (id: string): Promise<AdvisorItem | null> => {
  try {
    const response = await axios.post(`${API_BASE}/fetch`, { id });
    
    if (response.data.status === "success" && response.data.data) {
      const data = response.data.data;
      const advisor = Array.isArray(data) ? data[0] : data;
      return advisor.is_active ? advisor : null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching advisor:", error);
    return null;
  }
};