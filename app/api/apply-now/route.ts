"use client"
import axios from "axios";
const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

// Form data interface
export interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  level: string;
  program: string;
}

interface Program {
  id: string;
  course_name: string;
  course_slug: string;
  parent_course_id: string | null;
  parent_course_name: string | null;
  parent_course_slug: string | null;
}

// Fetch list of states
export const getStates = async (): Promise<string[]> => {
  try {
    const res = await axios.get(`${API_BASE}/city-state/states`);
    // API se array of objects aata hai, extract only names
    if (Array.isArray(res.data)) {
      return res.data.map((item: any) => 
        typeof item === 'string' ? item : item.name || item.state || String(item)
      ).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};

// Fetch cities based on selected state
export const getCities = async (state: string): Promise<string[]> => {
  try {
    const res = await axios.post(`${API_BASE}/city-state/cities`, { state });
    // API se array of objects aata hai, extract only names
    if (Array.isArray(res.data)) {
      return res.data.map((item: any) => 
        typeof item === 'string' ? item : item.name || item.city || String(item)
      ).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

// Fetch all education levels
export const getLevels = async (): Promise<string[]> => {
  try {
    const res = await axios.post(`${API_BASE}/courses/levels`);
    // API se array of objects aata hai, extract only names
    if (Array.isArray(res.data)) {
      return res.data.map((item: any) => 
        typeof item === 'string' ? item : item.name || item.level || String(item)
      ).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
};

// Fetch programs based on selected level
export const getPrograms = async (level: string): Promise<string[]> => {
  try {
    const res = await axios.post(`${API_BASE}/courses/programs`, { level });
    
    // EXTRACT ONLY COURSE NAMES AS STRINGS
    if (Array.isArray(res.data)) {
      return res.data.map((item: any) => {
        // Check all possible property names
        const name = item.course_name || item.name || item.program || item.title;
        return typeof name === 'string' ? name : String(item);
      }).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
};

// Submit application form
export const submitApplication = async (data: FormData) => {
  try {
    const res = await axios.post(`${API_BASE}/lead/leads`, {
      name: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
      state: data.state,
      city: data.city,
      level: data.level,
      program: data.program,
    });
    return res.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};