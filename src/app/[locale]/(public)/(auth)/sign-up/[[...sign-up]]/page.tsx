import { SignUp } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { LocaleParam } from '@/interfaces';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({ locale, namespace: 'Metadata.Signup' });

    return { title: t('title'), description: t('description') };
}

export default function SignupPage() {
    return <SignUp />;
}
