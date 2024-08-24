'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { H2, TextP } from '@/components';
import { Theme } from '@/interfaces';
import { cn } from '@/utils/helpers';

import bestResultsDark from './img/best-results-dark.webp';
import bestResultsLight from './img/best-results-light.webp';
import chartDark from './img/chart-dark.webp';
import chartLight from './img/chart-light.webp';
import listDark from './img/list-dark.webp';
import listLight from './img/list-light.webp';
import statsDark from './img/stats-dark.webp';
import statsLight from './img/stats-light.webp';

export default function HomePageImages() {
    const { resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    const images = [
        {
            img: resolvedTheme === Theme.DARK ? chartDark : chartLight,
            title: 'Visualize',
            desc: 'Track your workouts and view the graphical summary',
            alt: 'Chart section screenshot',
            w: 750,
        },
        {
            img: resolvedTheme === Theme.DARK ? statsDark : statsLight,
            title: 'Statistics',
            desc: 'Monitor various statistics on monthly or year basis or view all of them',
            alt: 'Statistics section screenshot',
            w: 750,
        },
        {
            img: resolvedTheme === Theme.DARK ? listDark : listLight,
            title: 'View All',
            desc: 'Get more insight about your workouts in a detailed view',
            alt: 'Workout list screenshot',
            w: 600,
        },
        {
            img:
                resolvedTheme === Theme.DARK
                    ? bestResultsDark
                    : bestResultsLight,
            title: 'Best Results',
            desc: 'View the your best workouts',
            alt: 'Best results screenshot',
            w: 450,
        },
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return images.map(({ img, title, desc, alt, w }, idx) => (
        <section
            key={isMounted ? idx : Math.random()}
            className={cn(
                'flex flex-col gap-6 lg:gap-10',
                idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            )}
        >
            <header className="flex flex-col gap-1 lg:max-w-xs">
                <H2>{title}</H2>
                <TextP>{desc}</TextP>
            </header>
            <Image
                src={img}
                width={w}
                alt={alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
            />
        </section>
    ));
}
