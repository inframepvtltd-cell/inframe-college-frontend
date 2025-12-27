// lib/api.ts
import axios from "axios";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/blog`

export const getAllBlogs = async () => {
    const res = await axios.get(`${API_BASE}/allblogs `);
    console.log(res.data.data);
    
    return res.data.data; // assuming { success, data }
};

export const getBlogBySlug = async (slug: string) => {

    const res = await axios.post(`${API_BASE}/fetch`, {
        slug
    });

    console.log(res.data);

    return res.data;
};
