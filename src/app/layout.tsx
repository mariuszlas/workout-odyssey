import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { GA4Script } from '@/components';
import { _t } from '@/constants';
import { Children, Cookie, Theme } from '@/interfaces';
import { ConfigProvider, ThemeProvider, ToastProvider } from '@/providers';
import { getAppConfig } from '@/server/helpers';
import { isValidTheme } from '@/utils/helpers';

import './globals.css';

export const metadata: Metadata = {
    title: _t.pageTitle,
    description: _t.landingSeoDescription,
};

export default async function RootLayout({ children }: Children) {
    const config = await getAppConfig();
    const themeCookie = cookies().get(Cookie.THEME)?.value;
    const theme = isValidTheme(themeCookie) ? themeCookie : Theme.LIGHT;

    return (
        <ThemeProvider specifiedTheme={theme}>
            <ConfigProvider appConfig={config}>
                <html
                    lang="en"
                    data-theme={theme}
                    className="transition-colors duration-150"
                >
                    <body>
                        <ToastProvider>
                            <div
                                id="page-content"
                                className="flex min-h-screen flex-col"
                            >
                                {children}
                            </div>
                        </ToastProvider>
                        <GA4Script />
                        <SpeedInsights />
                        <Analytics />
                    </body>
                </html>
            </ConfigProvider>
        </ThemeProvider>
    );
}
