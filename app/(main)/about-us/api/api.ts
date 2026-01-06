import axios from 'axios';

export interface AboutSection {
  id: string;
  section_type: string;
  title: string;
  description: string;
  order_num: number;
  max_images: number;
  has_title: boolean;
  has_content: boolean;
  has_extra_text: boolean;
  has_icon: boolean;
  has_video: boolean;
  supports_multiple_images: boolean;
  is_active: boolean;
}

export interface AboutSectionItem {
  id: string;
  section_id: string;
  title: string | null;
  content: string | null;
  extra_text: string | null;
  icon: string | null;
  video_url: string | null;
  image_urls: string[];
  order_num: number;
  is_active: boolean;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

export interface PlacementPartner {
  id: string;
  name: string;
  logo: string;
  website: string;
  industry_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlacementPartnerApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}
const API_BASE = process.env.NEXT_PUBLIC_BASE_URL + '/about_section';
const PLACEMENT_API_BASE = process.env.NEXT_PUBLIC_BASE_URL + '/placement_partners';

// Helper for Axios response
async function handleResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const res = await promise;
    if (res.data.status === 'error') throw new Error(res.data.message);
    return res.data.data as T;
  } catch (err: any) {
    console.error('API Error:', err);
    throw new Error(err.response?.data?.message || err.message || 'Request failed');
  }
}

// Fetch all about sections
export async function fetchAboutSections(): Promise<AboutSection[]> {
  return handleResponse<AboutSection[]>(
    axios.post(`${API_BASE}/sections`, {})
  );
}

// Fetch single about section with items
export async function fetchAboutSection(
  sectionType: string
): Promise<{ section: AboutSection; items: AboutSectionItem[] }> {
  return handleResponse<{ section: AboutSection; items: AboutSectionItem[] }>(
    axios.post(`${API_BASE}/section`, {
      section_type: sectionType,
      include_inactive_items: true
    })
  );
}

// Fetch all sections with their items
export async function fetchAllAboutSectionsWithItems(): Promise<
  { section: AboutSection; items: AboutSectionItem[] }[]
> {
  try {
    const sections = await fetchAboutSections();
    
    const sectionsWithItems = await Promise.all(
      sections.map(async (section) => {
        try {
          const { items } = await fetchAboutSection(section.section_type);
          return { section, items: items.filter(item => item.is_active) };
        } catch (error) {
          console.error(`Error fetching items for ${section.section_type}:`, error);
          return { section, items: [] };
        }
      })
    );

    return sectionsWithItems.sort((a, b) => a.section.order_num - b.section.order_num);
  } catch (error) {
    console.error('Error fetching all sections with items:', error);
    return [];
  }
}

// Section configuration
export function getSectionConfig(sectionType: string) {
  const configs: Record<string, any> = {
    'hero': { 
      name: 'Hero Section',
      rows: 1, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 12, 
      supportsMultipleImages: true,
      description: '12 images grid'
    },
    'counter': { 
      name: 'Counter Section',
      rows: 3, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: true, 
      imageLimit: 1, 
      supportsMultipleImages: false,
      description: '3 counter cards'
    },
    'about': { 
      name: 'About Section',
      rows: 1, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 1, 
      supportsMultipleImages: false,
      description: 'About content with image'
    },
    'mission': { 
      name: 'Mission Section',
      rows: 1, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 1, 
      supportsMultipleImages: false,
      description: 'Mission content'
    },
    'vision': { 
      name: 'Vision Section',
      rows: 1, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 1, 
      supportsMultipleImages: false,
      description: 'Vision content'
    },
    'about_inframe': { 
      name: 'About Inframe Features',
      rows: 4, 
      hasImages: false, 
      hasIcon: true, 
      hasExtraText: false, 
      imageLimit: 0, 
      supportsMultipleImages: false,
      description: '4 feature cards with icons'
    },
    'affiliation': { 
      name: 'Affiliation Section',
      rows: 8, 
      hasImages: false, 
      hasIcon: true, 
      hasExtraText: false, 
      imageLimit: 0, 
      supportsMultipleImages: false,
      description: '8 affiliation cards'
    },
    'core_values': { 
      name: 'Core Values',
      rows: 3, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 1, 
      supportsMultipleImages: false,
      description: '3 core values cards'
    },
    'campus_life': { 
      name: 'Campus Life',
      rows: 1, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 13, 
      supportsMultipleImages: true,
      description: '13 campus life images'
    },
    'foundational_beliefs': { 
      name: 'Foundational Beliefs',
      rows: 1, 
      hasImages: true, 
      hasIcon: false, 
      hasExtraText: false, 
      imageLimit: 2, 
      supportsMultipleImages: true,
      description: 'Foundational beliefs with 2 images'
    }
  };

  return configs[sectionType] || { 
    name: 'Default Section',
    rows: 1, 
    hasImages: true, 
    hasIcon: false, 
    hasExtraText: false, 
    imageLimit: 1, 
    supportsMultipleImages: false,
    description: 'Default configuration'
  };
}

// Fetch all active placement partners (for public display)
export async function fetchActivePlacementPartners(): Promise<PlacementPartner[]> {
  try {
    const response = await axios.post<PlacementPartnerApiResponse<PlacementPartner[]>>(
      `${PLACEMENT_API_BASE}/fetch`,
      {}
    );
    
    if (response.data.status === "success") {
      // Filter only active partners and sort by creation date
      return (response.data.data || [])
        .filter(partner => partner.is_active)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return [];
  } catch (error) {
    console.error("Error fetching placement partners:", error);
    return [];
  }
}

// Fetch all placement partners (for admin dashboard)
export async function fetchAllPlacementPartners(): Promise<PlacementPartner[]> {
  try {
    const response = await axios.post<PlacementPartnerApiResponse<PlacementPartner[]>>(
      `${PLACEMENT_API_BASE}/fetch`,
      {}
    );
    
    if (response.data.status === "success") {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching placement partners:", error);
    return [];
  }
}

// Get partner statistics
export async function getPartnerStatistics(): Promise<{
  total: number;
  active: number;
  inactive: number;
  industries: string[];
}> {
  try {
    const partners = await fetchAllPlacementPartners();
    const active = partners.filter(p => p.is_active).length;
    const industries = Array.from(
      new Set(partners.map(p => p.industry_type).filter(Boolean))
    ) as string[];
    
    return {
      total: partners.length,
      active,
      inactive: partners.length - active,
      industries
    };
  } catch (error) {
    console.error("Error getting partner statistics:", error);
    return { total: 0, active: 0, inactive: 0, industries: [] };
  }
}