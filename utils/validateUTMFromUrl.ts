function validateUtmFromUrl(pathname: string) {
    const UTM_CAMPAIGNS: Record<string, string[]> = {
        'ads_team+common_remarketing_leads+120512345678901235+Interior_Course_Creative_01+120512345678901236': [
            '/professional-online-courses/graphic-design',
        ],

        'Meta+Ads+FB+IG//Open+Targeting//06.01.2026+Inframe+Graphic+Design+Course//Purchase//Scaling//06.01.2026+Graphic+Design+Course+Creative+01+//+Reel+Instagram_Feed': [
            '/professional-online-courses/graphic-design',
        ],
    };

    if (typeof window === 'undefined') return false;

    let fullUrl = window.location.href;

    try {
        fullUrl = decodeURIComponent(fullUrl);
    } catch { 
        fullUrl = window.location.href;
    }

    fullUrl = fullUrl
        .replace(/\s+/g, '+');

    return Object.entries(UTM_CAMPAIGNS).some(
        ([signature, allowedPages]) =>
            fullUrl.includes(signature) && allowedPages.includes(pathname)
    );
}

export { validateUtmFromUrl };