// import api from "@/lib/api";
import axios from "axios";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}`
export interface Career {
  id: string;
  title: string;
  place: string;
  description: string;
  requirements: string[];
  part_time: boolean;
  is_active: boolean;
}

// GET: fetch all careers
export const getAllCareers = async () => {
  const res = await axios.get(`${API_BASE}/career/all`);
  return res.data;
};

// POST: apply for career
export const applyForCareer = async (formData: FormData) => {
  const res = await axios.post(
    `${API_BASE}/test/add`,
    formData
  );

  return res.data;
};



// export const getAllJobRoles = async () => {
//     const res = await axios.get(`${API_BASE}/career/all`);
//     return res.data;
// };