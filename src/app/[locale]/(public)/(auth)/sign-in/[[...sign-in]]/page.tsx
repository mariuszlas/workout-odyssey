import { SignIn } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

import { LocaleParam } from '@/interfaces';

export const dynamic = 'auto';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({ locale, namespace: 'Metadata.Login' });

    return { title: t('title'), description: t('description') };
}

export default function SigninPage() {
    return <SignIn forceRedirectUrl={'/dashboard/running'} />;
}
