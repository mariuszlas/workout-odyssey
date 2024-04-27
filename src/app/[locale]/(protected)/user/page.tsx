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
        <main className="mx-auto px-2 py-6 md:px-4">
            <Heading className="pb-8 md:px-4" value={t('header')} />

            <div className=" flex max-w-screen-lg gap-8 md:px-4">
                <div>
                    <Suspense fallback={<AccountSettingsSkeleton />}>
                        <AccountSettings username={username} />
                    </Suspense>
                </div>

                <div className="visible hidden w-[30rem] lg:block">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
}
