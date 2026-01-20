import axios from "axios";
const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

// Types
export interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  level: string;
  program: string;
}

// Fetch states
export const getStates = async (): Promise<string[]> => {
  const res = await axios.get(`${API_BASE}/city-state/states`);
  if (Array.isArray(res.data)) return res.data.map((s: any) => s.name || s.state || s);
  return [];
};

// Fetch cities for a state
export const getCities = async (state: string): Promise<string[]> => {
  const res = await axios.post(`${API_BASE}/city-state/cities`, { state });
  if (Array.isArray(res.data)) return res.data.map((c: any) => c.name || c.city || c);
  return [];
};

// Fetch education levels
export const getLevels = async (): Promise<string[]> => {
  const res = await axios.post(`${API_BASE}/courses/levels`);
  if (Array.isArray(res.data)) return res.data.map((l: any) => l.name || l.level || l);
  return [];
};

// Fetch programs for a level
export const getPrograms = async (level: string): Promise<string[]> => {
  const res = await axios.post(`${API_BASE}/courses/programs`, { level });
  if (Array.isArray(res.data)) return res.data.map((p: any) => p.course_name || p.name || p);
  return [];
};

// Submit application
export const submitApplication = async (data: FormData) => {
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
};
