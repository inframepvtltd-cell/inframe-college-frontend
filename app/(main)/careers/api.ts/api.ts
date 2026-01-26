// api.ts
import axios from "axios";
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

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// GET: fetch all careers
export const getAllCareers = async (): Promise<ApiResponse<Career[]>> => {
    try {
        const res = await axios.get(`${API_BASE}/career/all`);
        return res.data;
    } catch (error) {
        console.error("Error fetching careers:", error);
        throw error;
    }
};

// POST: apply for career
export const applyForCareer = async (formData: FormData): Promise<{status: string; message: string}> => {
    try {
        const res = await axios.post(
            `${API_BASE}/app/add`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res.data;
    } catch (error: any) {
        console.error("Error submitting application:", error);
        if (error.response) {
            throw new Error(error.response.data.message || "Submission failed");
        } else if (error.request) {
            throw new Error("No response from server. Please check your connection.");
        } else {
            throw new Error("Failed to submit application.");
        }
    }
};




















// // api.ts
// import axios from "axios";
// const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}`

// export interface Career {
//     id: string;
//     title: string;
//     place: string;
//     description: string;
//     requirements: string[];
//     part_time: boolean;
//     is_active: boolean;
// }

// export interface ApiResponse<T> {
//     success: boolean;
//     data: T;
//     message?: string;
// }

// // GET: fetch all careers
// export const getAllCareers = async (): Promise<ApiResponse<Career[]>> => {
//     try {
//         const res = await axios.get(`${API_BASE}/career/all`);
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching careers:", error);
//         throw error;
//     }
// };

// // POST: apply for career
// export const applyForCareer = async (formData: FormData): Promise<{status: string; message: string}> => {
//     try {
//         const res = await axios.post(
//             `${API_BASE}/app/add`,
//             formData,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }
//         );
//         return res.data;
//     } catch (error: any) {
//         console.error("Error submitting application:", error);
//         if (error.response) {
//             throw new Error(error.response.data.message || "Submission failed");
//         } else if (error.request) {
//             throw new Error("No response from server. Please check your connection.");
//         } else {
//             throw new Error("Failed to submit application.");
//         }
//     }
// };