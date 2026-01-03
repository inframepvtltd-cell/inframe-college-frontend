import axios from 'axios';

/* =========================
   Types
========================= */
export interface LifeSection {
  id: string;
  section_type: string;
  title: string;
  description: string | null;
  order_num: number;
  max_images: number;
  has_title: boolean;
  has_content: boolean;
  has_extra_text: boolean;
  has_icon: boolean;
  has_video: boolean;
  supports_multiple_images: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LifeSectionItem {
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
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

/* =========================
   Axios base
========================= */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_BASE = `${BASE_URL}/life_section`;

/* =========================
   Fetch ALL Life Sections
========================= */
export async function fetchAllLifeSections(): Promise<LifeSection[]> {
  const res = await axios.post<ApiResponse<LifeSection[]>>(`${API_BASE}/sections`);
  if (res.data.status === 'error') throw new Error(res.data.message);
  return res.data.data;
}

/* =========================
   Fetch Single Section + Items
========================= */
export async function fetchLifeSectionByType(
  sectionType: string
): Promise<{ section: LifeSection; items: LifeSectionItem[] }> {
  const res = await axios.post<
    ApiResponse<{ section: LifeSection; items: LifeSectionItem[] }>
  >(`${API_BASE}/section`, { section_type: sectionType });

  if (res.data.status === 'error') throw new Error(res.data.message);
  return res.data.data;
}
