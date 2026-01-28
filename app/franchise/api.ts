// services/franchiseApi.ts
import axios from "axios";
export type SectionItem = {
  id: string;
  title: string;
  content: string;
  icon?: string;
  image_urls?: string;
  created_at: string;
};

export type Section = {
  section_id: string;
  section_type: string;
  section_title: string;
  is_active: boolean;
  items: SectionItem[];
};
export type StateItem = {
  id: string;
  name: string;
};

export type CityItem = {
  id: string;
  name: string;
  state_id: string;
};
export type FranchiseLead = {
  name: string;
  phone_number: string;
  email: string;
  state: string;
  city: string;
  investment_budget: string;
  current_profession: string;
};
const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/franchise_section`;
const API_BASEForm = `${process.env.NEXT_PUBLIC_BASE_URL}/franchise`;
const API_BASEURl = process.env.NEXT_PUBLIC_BASE_URL + "/franchiseMain_section";
const API_BASESEOURL = process.env.NEXT_PUBLIC_BASE_URL + "/franchise_seo";
const API_BASE_City = `${process.env.NEXT_PUBLIC_BASE_URL}/city-state`;

export const fetchSectionsWithItems = async () => {
  try {
    const res = await axios.get(`${API_BASE}/franchise-sections-items`);

    if (res.data.status === "success") {
      return res.data.data;
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
      include_inactive: false,
    });
    return res.data.data;
  } catch (error: any) {
    console.log(
      "Error fetching sections:",
      error.response?.data || error.message,
    );
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
      include_inactive_items: false,
    });
    return res.data.data;
  } catch (error: any) {
    console.error(
      "Error fetching section items:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const fetchSectionsAll = async () => {
  try {
    const res = await axios.get(`${API_BASEURl}/main-sections`);
    console.log("All Sections Response:", res.data);
    return res.data.data; // returns array of all sections
  } catch (error: any) {
    console.error(
      "Error fetching all sections:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const fetchFranchiseSEOBySlug = async (slug: string) => {
  try {
    const res = await axios.get(`${API_BASESEOURL}/fetch-slug/${slug}`);
    console.log("Slug Resposne", res);

    if (res.data.status === "success") {
      return res.data.data;
    } else {
      console.error("SEO slug fetch failed:", res.data.message);
      return null;
    }
  } catch (error: any) {
    console.log(
      "Error fetching franchise SEO by slug:",
      error.response?.data || error.message,
    );
    return null;
  }
};

export const createFranchiseLead = async (leadData: FranchiseLead) => {
  console.log("Hit createFranchiseLead with data:", leadData);

  try {
    console.log("Calling API at:", `${API_BASEForm}/create-lead`);

    const res = await axios.post(`${API_BASEForm}/create-lead`, leadData, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    if (res.data.success) {
      console.log("Lead created successfully, ID:", res.data.leadId);
      return res.data.leadId;
    } else {
      console.error("API returned success=false:", res.data.message);
      return null;
    }
  } catch (error: any) {
    console.error("Error creating franchise lead:");

    if (error.response) {
    } else if (error.request) {
      console.error("Is server running? Check CORS?");
    } else {
      console.error("Error setting up request:", error.message);
    }

    return null;
  }
};
export const fetchStates = async (): Promise<StateItem[]> => {
  console.log("Hit States");
  try {
    const res = await axios.get(`${API_BASE_City}/states`);
    console.log("Response State", res);

    if (res.status === 200) {
      return res.data;
    }
    return res.data.data;

    return [];
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};
export const fetchCities = async (stateId: string): Promise<CityItem[]> => {
  console.log("Hit City");
  try {
    const res = await axios.post(`${API_BASE_City}/cities`, {
      state_id: stateId,
    });

    console.log("City Data", res);

    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
