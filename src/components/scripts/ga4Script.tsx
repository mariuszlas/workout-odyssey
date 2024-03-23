import { GoogleAnalytics } from '@next/third-parties/google';

export const GA4Script = () => {
    const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

    if (process.env.NODE_ENV !== 'production' || !gaTrackingId) return;

    return <GoogleAnalytics gaId={gaTrackingId} />;
};
