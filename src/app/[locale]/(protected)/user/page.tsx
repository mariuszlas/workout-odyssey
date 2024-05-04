import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Heading } from '@/components';
import { LocaleParam } from '@/interfaces';
import { validateSession } from '@/server/helpers';

import { AccountSettings, AccountSettingsSkeleton } from './accountSettings';
import { Sidebar } from './sidebar';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({
        locale,
        namespace: 'Metadata.AccountSettings',
    });

    return { title: t('title'), description: t('description') };
}

export default function AccountSettingsPage() {
    const username = validateSession();
    const t = useTranslations('AccountSettings');

    return (
        <main className="mx-auto p-4 sm:p-6">
            <Heading className="pb-6 sm:pb-8" value={t('header')} />
            <div className="flex max-w-screen-lg gap-6">
                <Suspense fallback={<AccountSettingsSkeleton />}>
                    <AccountSettings username={username} />
                </Suspense>
                <div className="hidden w-[30rem] lg:block">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
}
