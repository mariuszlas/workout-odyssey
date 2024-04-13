import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en'];
export const defaultLocale = 'en';
export const localePrefix = 'never';

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale)) notFound();

    return { messages: (await import(`../messages/${locale}.json`)).default };
});
