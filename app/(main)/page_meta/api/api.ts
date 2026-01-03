const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || '';


// Dynamic JSONB type - kuch bhi ho sakta hai
export type AdditionalText = Record<string, any>;

export interface PageMeta {
  id: number;
  page_slug: string;
  title: string;
  description: string;
  keywords: string[] | string;
  additional_text?: AdditionalText;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: PageMeta;
}

const processKeywords = (keywords: string | string[]): string[] => {
  if (Array.isArray(keywords)) {
    return keywords;
  }

  try {
    return JSON.parse(keywords);
  } catch {
    return keywords.split(',').map(k => k.trim());
  }
};

// Fetch page metadata by slug
export const fetchPageMetaBySlug = async (slug: string): Promise<PageMeta | null> => {
  try {
    console.log(API_BASE);
    const response = await fetch(`${API_BASE}/page_meta/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_slug: slug,
        path: slug
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data: ApiResponse = await response.json();

    if (data.success && data.data) {
      // Agar keywords string hai to array mein convert karo
      const metaData = data.data;
      if (typeof metaData.keywords === 'string') {
        try {
          metaData.keywords = JSON.parse(metaData.keywords);
        } catch {
         metaData.keywords = processKeywords(metaData.keywords);
        }
      }
      return metaData;
    }

    return null;

  } catch (error) {
    console.error('Error fetching page metadata:', error);
    return null;
  }
};