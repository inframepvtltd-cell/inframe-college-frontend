'use client';

import { useEffect } from 'react';
import { usePageMeta } from '../hook/usePageMeta';

interface PageMetaDataProps {
  slug: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export default function PageMetaData({ 
  slug, 
  fallbackTitle, 
  fallbackDescription 
}: PageMetaDataProps) {
  const { meta, loading } = usePageMeta(slug);

  useEffect(() => {
    if (!loading && meta) {
      // Update page title
      document.title = meta.title;
      
      // Update meta tags dynamically
      updateMetaTag('description', meta.description);
      updateMetaTag('keywords', Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords);
      
      // Update Open Graph tags if available
      if (meta.additional_text?.openGraph) {
        const og = meta.additional_text.openGraph;
        updateMetaTag('og:title', og.title || meta.title);
        updateMetaTag('og:description', og.description || meta.description);
        updateMetaTag('og:type', og.type || 'website');
        if (og.image) updateMetaTag('og:image', og.image);
        if (og.url) updateMetaTag('og:url', og.url);
      }
      
      // Update Twitter tags if available
      if (meta.additional_text?.twitter) {
        const twitter = meta.additional_text.twitter;
        updateMetaTag('twitter:card', twitter.card || 'summary_large_image');
        updateMetaTag('twitter:title', twitter.title || meta.title);
        updateMetaTag('twitter:description', twitter.description || meta.description);
        if (twitter.image) updateMetaTag('twitter:image', twitter.image);
      }
    } else if (!loading && !meta) {
      // Use fallback if no meta found
      if (fallbackTitle) document.title = fallbackTitle;
      if (fallbackDescription) updateMetaTag('description', fallbackDescription);
    }
  }, [meta, loading, fallbackTitle, fallbackDescription]);

  const updateMetaTag = (name: string, content: string) => {
    if (!content) return;
    
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement;
    }
    
    if (element) {
      element.content = content;
    } else {
      // Create new meta tag
      const meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else if (name.startsWith('twitter:')) {
        meta.setAttribute('name', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.content = content;
      document.head.appendChild(meta);
    }
  };

  return null; // This component doesn't render anything visible
}