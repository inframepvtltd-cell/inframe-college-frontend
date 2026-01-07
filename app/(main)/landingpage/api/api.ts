// services/api.ts
import axios from "axios";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/courses`


// Fetch course by slug
export const fetchCourseBySlug = async (slug: string) => {
    try {
        console.log(slug)
        const response = await axios.post(`${API_BASE}/city-page/slug`, { slug });
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


