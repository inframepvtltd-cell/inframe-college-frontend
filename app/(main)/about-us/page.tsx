// app/(main)/aboutus/page.tsx
import { Metadata } from 'next';
import { fetchAllAboutSectionsWithItems } from './api/api';
import AboutPage from './components/AboutPage';

export const metadata: Metadata = {
  title: 'About Us | Inframe School of Art & Design | Jodhpur',
  description: 'Learn more about Inframe School of Art & Design in Jodhpur. With 15+ years of excellence, we offer top-quality education in art, design, business, and more.',
};

export default async function Page() {
  const sectionsWithItems = await fetchAllAboutSectionsWithItems();
  
  return (
    <div className="min-h-screen">
      <AboutPage sectionsWithItems={sectionsWithItems} />
    </div>
  );
}