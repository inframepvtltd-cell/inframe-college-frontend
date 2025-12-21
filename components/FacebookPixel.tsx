'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).fbq) return;

    const allowedPaths = [
      '/professional-online-courses/interior-design',
      '/professional-online-courses/graphic-design',
    ];

    if (!allowedPaths.includes(pathname)) return;

    const requiredUtms = {
      utm_team: 'ads_team',
      utm_cname: 'common_remarketing_leads',
      utm_asid: '120512345678901235',
      utm_adname: 'Interior_Course_Creative_01',
      utm_adid: '120512345678901236',
    };

    const hasAllUtms = Object.entries(requiredUtms).every(
      ([key, value]) => searchParams.get(key) === value
    );

    if (!hasAllUtms) return;

    (window as any).fbq('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}
