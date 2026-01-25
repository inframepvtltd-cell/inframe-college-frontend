import React from 'react'
import LandingPageComponent from '../components/LandingPageComponent'
import { getFAQsByCourse, getLandingPageBySlug } from './api';
import { notFound } from 'next/navigation';

interface Props {
    params: { slug: string };
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const response = await getLandingPageBySlug(slug);
    // const faqs = await getFAQsByCourse(slug);
    if (!response || !response.data) {
        notFound();
    }
    const pageData = response.data; 
    console.log(pageData);
    
    return (
        <>
            <LandingPageComponent data={pageData} />
        </>
    )
}

