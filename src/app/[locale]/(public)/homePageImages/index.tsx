'use client';

import Image from 'next/image';

import { Heading, Text } from '@/components';
import { Theme } from '@/interfaces';
import { useTheme } from '@/providers';
import { cn } from '@/utils/helpers';

import bestResultsDark from './img/best-results-dark.webp';
import bestResultsLight from './img/best-results-light.webp';
import chartDark from './img/chart-dark.webp';
import chartLight from './img/chart-light.webp';
import listDark from './img/list-dark.webp';
import listLight from './img/list-light.webp';
import statsDark from './img/stats-dark.webp';
import statsLight from './img/stats-light.webp';

type Props = { subheaders: { title: string; desc: string }[] };

export default function HomePageImages({ subheaders }: Props) {
    const [theme] = useTheme();

    const images = [
        {
            img: theme === Theme.DARK ? chartDark : chartLight,
            ...subheaders[0],
            w: 750,
        },
        {
            img: theme === Theme.DARK ? statsDark : statsLight,
            ...subheaders[1],
            w: 750,
        },
        {
            img: theme === Theme.DARK ? listDark : listLight,
            ...subheaders[2],
            w: 600,
        },
        {
            img: theme === Theme.DARK ? bestResultsDark : bestResultsLight,
            ...subheaders[3],
            w: 450,
        },
    ];

    return (
        <>
            {images.map(({ img, title, desc, w }, idx) => (
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
                        src={img}
                        width={w}
                        alt="app screenshot"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                </section>
            ))}
        </>
    );
}
