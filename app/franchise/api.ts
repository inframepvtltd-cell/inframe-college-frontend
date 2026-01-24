// services/franchiseApi.ts
import axios from 'axios';
 export type SectionItem = {
  id: string;
  title: string;
  content: string;
  icon?: string;
  image_urls?: string;
};

 export type Section = {
  section_id: string;
  section_type: string;
  section_title: string;
  is_active: boolean;
  items: SectionItem[];
};

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/franchise_section`
const API_BASEURl = process.env.NEXT_PUBLIC_BASE_URL + '/franchiseMain_section';
const API_BASESEOURL = process.env.NEXT_PUBLIC_BASE_URL + '/franchise_seo';

export const fetchSectionsWithItems = async () => {
  try {
    const res = await axios.get(`${API_BASE}/franchise-sections-items`);

    if (res.data.status ==="success") {
      return res.data.data; // this is the array of sections with items
    } else {
      console.error("Error fetching sections:", res.data.message);
      return [];
    }
  } catch (err) {
    console.error("API fetchSectionsWithItems error:", err);
    return [];
  }
};
export const fetchSections = async () => {
  try {
    const res = await axios.post(`${API_BASE}/franchise-sections`, {
      include_inactive: false
    });
    return res.data.data; 
  } catch (error: any) {
    console.log('Error fetching sections:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchFranchiseSEOPages = async () => {
  const res = await axios.get(`${API_BASESEOURL}/franchise-seo-pages`);
  return res.data.data;
};

export const fetchSectionWithItems = async (section_type: string) => {
  try {
    const res = await axios.post(`${API_BASE}/franchise-sectionItem`, {
      section_type,
      include_inactive_items: false
    });
    return res.data.data; 
  } catch (error: any) {
    console.error('Error fetching section items:', error.response?.data || error.message);
    throw error;
  }
};
export const fetchSectionsAll = async () => {
  try {
    const res = await axios.get(`${API_BASEURl}/main-sections`);
    console.log("All Sections Response:", res.data);
    return res.data.data; // returns array of all sections
  } catch (error: any) {
    console.error('Error fetching all sections:', error.response?.data || error.message);
    throw error;
  }
};
export const fetchFranchiseSEOBySlug = async (slug: string) => {
  try {
    const res = await axios.get(
      `${API_BASESEOURL}/fetch-slug/${slug}`
    );
    console.log("Slug Resposne",res)

    if (res.data.status === "success") {
      return res.data.data; // single city data
    } else {
      console.error("SEO slug fetch failed:", res.data.message);
      return null;
    }
  } catch (error: any) {
    console.log(
      "Error fetching franchise SEO by slug:",
      error.response?.data || error.message
    );
    return null;
  }
};
