// app/(main)/lifeatinframe/page.tsx
import { Metadata } from 'next';
import LifeAtInframePage from './components/LifeAtInframePage';
import {
  fetchAllLifeSections,
  fetchLifeSectionByType,
  LifeSection,
  LifeSectionItem
} from './api/api';

export const metadata: Metadata = {
  title: 'Life at Inframe School | Vibrant Campus & Student Experience',
  description:
    'Experience life at Inframe School. Explore a vibrant campus, dynamic student activities, and a supportive environment fostering growth and success',
};

// Fetch sections + their items
async function getSectionsData() {
  try {
    const sections = await fetchAllLifeSections();

    const sectionsWithItems = await Promise.all(
      sections.map(async (section) => {
        try {
          const { items } = await fetchLifeSectionByType(section.section_type);
          return { section, items };
        } catch (error) {
          console.error(`Error fetching items for ${section.section_type}:`, error);
          return { section, items: [] };
        }
      })
    );

    return sectionsWithItems;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}

// Main Page Component
export default async function Page() {
  const sectionsWithItems = await getSectionsData();

  return (
    <main className="min-h-screen">
      <LifeAtInframePage sectionsWithItems={sectionsWithItems} />
    </main>
  );
}