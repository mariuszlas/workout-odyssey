import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { GA4Script, Toaster } from '@/components';
import { Children, Cookie, LocaleParam, Theme } from '@/interfaces';
import { ConfigProvider, ThemeProvider } from '@/providers';
import { getAppConfig } from '@/server/helpers';
import { isValidTheme } from '@/utils/helpers';

import '../globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://workoutodyssey.com'),
};

export default async function RootLayout({
    children,
    params: { locale },
}: LocaleParam & Children) {
    const config = await getAppConfig();
    const messages = await getMessages();
    const themeCookie = cookies().get(Cookie.THEME)?.value;
    const theme = isValidTheme(themeCookie) ? themeCookie : Theme.LIGHT;

    return (
        <ClerkProvider>
            <ThemeProvider specifiedTheme={theme}>
                <ConfigProvider appConfig={config}>
                    <html
                        lang={locale}
                        data-theme={theme}
                        className="transition-colors duration-150"
                    >
                        <body>
                            <NextIntlClientProvider
                                locale={locale}
                                messages={messages}
                            >
                                <div
                                    id="page-content"
                                    className="flex min-h-screen flex-col"
                                >
                                    {children}
                                </div>
                                <Toaster
                                    toastOptions={{
                                        classNames: {
                                            error: 'bg-red-400',
                                            success: 'bg-green-400',
                                            warning: 'bg-yellow-400',
                                            info: 'bg-blue-400',
                                        },
                                    }}
                                />
                            </NextIntlClientProvider>
                            <GA4Script />
                            <SpeedInsights />
                            <Analytics />
                        </body>
                    </html>
                </ConfigProvider>
            </ThemeProvider>
        </ClerkProvider>
    );
}
