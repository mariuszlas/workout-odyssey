import { getTranslations } from 'next-intl/server';

import { LocaleParam } from '@/interfaces';

import { PasswordResetPage } from './passwordResetPage';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({
        locale,
        namespace: 'Metadata.PasswordReset',
    });

    return { title: t('title'), description: t('description') };
}

export default function PasswordReset() {
    return <PasswordResetPage />;
}
