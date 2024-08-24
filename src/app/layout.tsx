import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { GA4Script, Toaster } from '@/components';
import { Children } from '@/interfaces';
import { ConfigProvider } from '@/providers';
import { getAppConfig } from '@/server/helpers';
import { cn } from '@/utils/helpers';

import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://workoutodyssey.com'),
};

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default async function RootLayout({ children }: Children) {
    const config = await getAppConfig();

    return (
        <ClerkProvider>
            <ConfigProvider appConfig={config}>
                <html
                    lang="en"
                    className={cn(
                        'transition-colors duration-150',
                        inter.className
                    )}
                    suppressHydrationWarning
                >
                    <body>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
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
                        </ThemeProvider>
                        <GA4Script />
                        <SpeedInsights />
                        <Analytics />
                    </body>
                </html>
            </ConfigProvider>
        </ClerkProvider>
    );
}
