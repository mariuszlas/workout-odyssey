import type { FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { H2, Skeleton } from '@/components';
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
            'border-base-content flex flex-col items-center gap-2 border-opacity-20 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg',
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
                <Skeleton />
            </ChartViewWrapper>
        );

    return (
        <ChartViewWrapper>
            <header className="flex items-center gap-4">
                <H2 className="text-lg" value={t('header')} />
                <YearSelector dashboard={dashboard} />
            </header>
            <BarChart dashboard={dashboard} />
        </ChartViewWrapper>
    );
};
