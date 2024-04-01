'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Heading, Text } from '@/components';
import { _t } from '@/constants';
import { useTheme } from '@/providers';
import { cn } from '@/utils/helpers';

export default function HomePage() {
    const [theme] = useTheme();

    const images = [
        {
            img: `chart-${theme}.webp`,
            title: _t.landing1Title,
            desc: _t.landing1Desc,
            w: 750,
            eager: true,
        },
        {
            img: `stats-${theme}.webp`,
            title: _t.landing2Title,
            desc: _t.landing2Desc,
            w: 750,
        },
        {
            img: `list-${theme}.webp`,
            title: _t.landing3Title,
            desc: _t.landing3Desc,
            w: 600,
        },
        {
            img: `best-results-${theme}.webp`,
            title: _t.landing4Title,
            desc: _t.landing4Desc,
            w: 450,
        },
    ];

    return (
        <main className="flex flex-col items-center gap-10 p-4 sm:p-10 lg:gap-20">
            <Heading value={_t.landingHeader} />

            <Link
                role="button"
                href="/dashboard/running"
                className="btn btn-primary btn-lg h-12 min-h-full"
            >
                {_t.btnGetStarted}
            </Link>

            {images.map(({ img, title, desc, w, eager }, idx) => (
                <section
                    key={title}
                    className={cn(
                        'flex flex-col gap-6 lg:gap-10',
                        idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    )}
                >
                    <header className="flex flex-col gap-1 lg:max-w-xs lg:gap-3">
                        <Heading as="h2" value={title} />
                        <Text className="text-2xl" value={desc} />
                    </header>

                    <Image
                        src={`/img/${img}`}
                        width={w}
                        height={'300'}
                        alt="app screenshot"
                        loading={eager ? 'eager' : 'lazy'}
                    />
                </section>
            ))}
        </main>
    );
}
