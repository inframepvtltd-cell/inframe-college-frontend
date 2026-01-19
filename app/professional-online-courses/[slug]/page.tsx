import React from 'react'
import LandingPageComponent from '../components/LandingPageComponent'
import { getFAQsByCourse, getLandingPageBySlug } from './api';
import { notFound } from 'next/navigation';

interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const { slug } = await params;
    const response = await getLandingPageBySlug(slug);
    // const faqs = await getFAQsByCourse(slug);
    if (!response || !response.data) {
        notFound();
    }
    const pageData = response.data; 
    
    return (
        <>
            <LandingPageComponent data={pageData} />
        </>
    )
}

