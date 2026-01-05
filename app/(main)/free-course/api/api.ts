import axios from "axios";
const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/courses`

type FreeCourse = {
  course_name: string;
  description: string;
  thumbnail_url: string;
  duration: string;
  mode: string;
  certificate: string;
  level: string;
  overview: string;
  course_description: string;
  course_level: string
};

export const fetchCourseBySlug = async (slug: string) => {
    try {
        console.log(slug)
        const response = await axios.post(`${API_BASE}/city-page/slug`, { slug });
        console.log(response.data);

        return response.data;
    } catch (error: any) {
        console.error("Error fetching course:", error.response || error.message);
        return null;
    }
};

// Fetch all courses
export const fetchAllCourses = async () => {
    try {
        const response = await axios.get(`${API_BASE}/courses`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching courses:", error.response || error.message);
        return [];
    }
};
export const getFreeCourses = async () => {
    try {
        const response = await axios.get(`${API_BASE}/getFreeCourses`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching courses:", error.response || error.message);
        return [];
    }
};
export const getFreeCourseBySlug = async (slug?: any) => {
    console.log(slug);

    try {
        const response = await axios.post(`${API_BASE}/getFreeCourseBySlug`, { slug });
        console.log(response.data);
        
        return response.data;
    } catch (error: any) {
        console.error("Error fetching courses:", error.response || error.message);
        return [];
    }
};