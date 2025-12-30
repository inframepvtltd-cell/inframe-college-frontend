// src/api/contact.api.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7000/api/v1";

// Contact Info API
const CONTACT_INFO_API = `${API_BASE}/contact_info`;
// Contact Form API (Note: typo in your code - "contac_us" should be "contact_us")
const CONTACT_US_API = `${API_BASE}/contact_us`;

// ========== CONTACT INFO TYPES ==========
export interface ContactInfoItem {
    id: string;
    title: string;
    value: string;
    created_at: string;
    updated_at: string;
}

// ========== CONTACT FORM TYPES ==========

// api/contact.api.ts
export interface ContactFormResponse {
    status: "success" | "error";
    message: string;
    data: {
        contact: ContactFormItem;
        emailStatus?: {
            adminEmailSent: boolean;
            userEmailSent: boolean;
            message: string;
        };
    } | null;
}

export interface ContactFormItem {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    created_at: string;
    updated_at: string;
}

// ========== CONTACT INFO API FUNCTIONS ==========

// Fetch all contact information
export const fetchContactInfo = async (): Promise<ContactInfoItem[]> => {
    try {
        const response = await axios.post(`${CONTACT_INFO_API}/fetch`, {});
        if (response.data.status === "success") {
            const data = response.data.data;
            return Array.isArray(data) ? data : [data];
        }
        return [];
    } catch (error) {
        console.error("Error fetching contact info:", error);
        return [];
    }
};

// Submit contact form
export const submitContactForm = async (formData: {
    first_name: string;
    last_name: string;
    email: string;
    category:string;
    message: string;
}): Promise<ContactFormResponse> => {
    try {
        const response = await axios.post(`${CONTACT_US_API}/add`, formData);
        return response.data;
    } catch (error: any) {
        console.error("Error submitting contact form:", error);
        return {
            status: "error",
            message: error.response?.data?.message || "Failed to submit contact form",
            data: null
        };
    }
};

// Helper function to get contact value by title
export const getContactValue = (contacts: ContactInfoItem[], title: string): string | null => {
    const contact = contacts.find(c =>
        c.title.toLowerCase() === title.toLowerCase() ||
        c.title.toLowerCase().replace(/_/g, ' ') === title.toLowerCase()
    );
    return contact?.value || null;
};

// Simple extractor for your specific needs
export const extractContactInfo = (contacts: ContactInfoItem[]) => {
  return {
    // Basic Info
    address: getContactValue(contacts, "address"),
    collegeName: getContactValue(contacts, "name") || getContactValue(contacts, "college_name"),

    // Phones
    admissionPhone: getContactValue(contacts, "admission_mob") ||
      getContactValue(contacts, "admission_phone"),
    adminPhone: getContactValue(contacts, "admin_mob") ||
      getContactValue(contacts, "admin_phone"),

    // Emails
    email: getContactValue(contacts, "email"),
    careerEmail: getContactValue(contacts, "career_email"),
    
    // Add examination email
    examinationEmail: getContactValue(contacts, "examination_email"),

    // Map & QR
    mapLink: getContactValue(contacts, "map") ||
      getContactValue(contacts, "google_map"),
    qrCode: getContactValue(contacts, "navigate_qr"),
  };
};