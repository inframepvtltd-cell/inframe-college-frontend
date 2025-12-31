import axios from 'axios';

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}/download`;

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_name: string;
  upload_date: string;
  download_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryItem {
  category: string;
  item_count: number;
  active_count: number;
  total_downloads: number;
}

export interface ApiResponse {
  status: "success" | "error";
  message: string;
  data: any;
}

// Fetch all downloads
export const fetchDownloads = async (category?: string): Promise<DownloadItem[]> => {
  try {
    const response = await axios.post(`${API_BASE}/fetch`, { category });
    
    if (response.data.status === "success") {
      const data = response.data.data;
      // Filter only active downloads for frontend
      const activeDownloads = Array.isArray(data) 
        ? data.filter((item: DownloadItem) => item.is_active)
        : [];
      return activeDownloads;
    }
    return [];
  } catch (error) {
    console.error("Error fetching downloads:", error);
    return [];
  }
};

// Fetch categories with stats
export const fetchCategories = async (): Promise<CategoryItem[]> => {
  try {
    const response = await axios.post(`${API_BASE}/categories`, {});
    
    if (response.data.status === "success") {
      const data = response.data.data;
      return Array.isArray(data) ? data : [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Increment download count
export const incrementDownloadCount = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE}/increment`, { id });
    return response.data;
  } catch (error: any) {
    console.error("Error incrementing download count:", error);
    return {
      status: "error",
      message: "Failed to track download",
      data: null
    };
  }
};

// Group downloads by category
export function groupDownloadsByCategory(downloads: DownloadItem[]): Record<string, DownloadItem[]> {
  const grouped: Record<string, DownloadItem[]> = {};

  downloads.forEach((item) => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  return grouped;
}

// Get all unique categories from downloads
export function getUniqueCategories(downloads: DownloadItem[]): string[] {
  return [...new Set(downloads.map(item => item.category))];
}

// Sort downloads by upload date (newest first)
export function sortDownloadsByDate(downloads: DownloadItem[]): DownloadItem[] {
  return [...downloads].sort((a, b) => 
    new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
  );
}