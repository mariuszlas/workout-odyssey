import type { FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Heading, Skeleton } from '@/components';
import type {
    Children,
    Dashboarad,
    Loading,
    WorkoutsDashboard,
} from '@/interfaces';

import { BarChart } from './chart';
import { YearSelector } from './yearSelector';

const ChartViewWrapper: FC<Children & Loading> = ({ children, isLoading }) => (
    <section
        className={clsx(
            'flex flex-col items-center gap-2 border-base-content border-opacity-20 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg',
            isLoading && 'aspect-[3/2]'
        )}
        data-testid="chart-section"
    >
        {children}
    </section>
);

export const ChartView: FC<Dashboarad & Loading> = ({
    dashboard = {} as WorkoutsDashboard,
    isLoading,
}) => {
    const t = useTranslations('Dashboard.Chart');

    if (isLoading)
        return (
            <ChartViewWrapper isLoading>
                <Skeleton h={'full'} />
            </ChartViewWrapper>
        );

    return (
        <ChartViewWrapper>
            <header className="flex items-center gap-6">
                <Heading as="h2" className="text-2xl" value={t('header')} />
                <YearSelector dashboard={dashboard} />
            </header>
            <BarChart dashboard={dashboard} />
        </ChartViewWrapper>
    );
};
