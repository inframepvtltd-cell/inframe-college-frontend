import axios from "axios";
const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}`;
// const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const upsertLandingPage = (data: FormData) =>
  axios.post(`${API_BASE}/landingpage/upsert`, data);


export async function getLandingPageBySlug(slug: string) {

  try {
    const res = await axios.post(
      `${API_BASE}/landingpage/by-slug`,
      { course_slug: slug },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data; // success
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null; // ✅ important
    }

    throw error; // real server error
  }
}