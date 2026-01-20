import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/blog`

export const getAllBlogs = async () => {
    const res = await axios.get(`${API_BASE}/allblogs `);
    return res.data.data;
};

export const getBlogBySlug = async (slug: string) => {
    const res = await axios.post(`${API_BASE}/fetch`, {
        slug
    });
    return res.data;
};
