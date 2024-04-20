import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Heading } from '@/components';
import { LocaleParam } from '@/interfaces';
import { Link } from '@/navigation';

import HomePageImages from './homePageImages';

export async function generateMetadata({ params: { locale } }: LocaleParam) {
    const t = await getTranslations({ locale, namespace: 'Metadata.Home' });

    return { title: t('title'), description: t('description') };
}

export default function HomePage() {
    const t = useTranslations('Home');

    const subheaders = [
        {
            title: t('subheaders.chart.title'),
            desc: t('subheaders.chart.description'),
            alt: t('subheaders.chart.alt'),
        },
        {
            title: t('subheaders.stats.title'),
            desc: t('subheaders.stats.description'),
            alt: t('subheaders.stats.alt'),
        },
        {
            title: t('subheaders.list.title'),
            desc: t('subheaders.list.description'),
            alt: t('subheaders.list.alt'),
        },
        {
            title: t('subheaders.bestResults.title'),
            desc: t('subheaders.bestResults.description'),
            alt: t('subheaders.bestResults.alt'),
        },
    ];

    return (
        <main className="flex flex-col items-center gap-10 p-4 sm:p-10 lg:gap-20">
            <Heading value={t('header')} />

            <Link
                role="button"
                href="/dashboard/running"
                className="btn btn-primary btn-lg h-12 min-h-full"
            >
                {t('cta')}
            </Link>

            <HomePageImages subheaders={subheaders} />
        </main>
    );
}
