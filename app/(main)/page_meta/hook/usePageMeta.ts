'use client';

import { useEffect, useState } from 'react';
import { PageMeta, fetchPageMetaBySlug } from '../api/api';

export const usePageMeta = (slug: string) => {
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeta = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchPageMetaBySlug(slug);
        setMeta(data);
      } catch (err) {
        setError('Failed to load page metadata');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadMeta();
    }
  }, [slug]);

  return { meta, loading, error };
};