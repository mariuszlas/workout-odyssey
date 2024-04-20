import type { FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Heading, Skeleton } from '@/components';
import type { Children, WorkoutsDashboard } from '@/interfaces';

import { BarChart } from './chart';
import { YearSelector } from './yearSelector';

// TODO: the same props as for Stats
export interface Props {
    dashboard?: WorkoutsDashboard;
    isLoading?: boolean;
}

export const ChartView: FC<Props> = ({
    dashboard = {} as WorkoutsDashboard,
    isLoading,
}) => {
    const t = useTranslations('Dashboard.Chart');

    const SectionWrapper: FC<Children> = ({ children }) => (
        <section
            className={clsx(
                'flex flex-col items-center gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg',
                isLoading && 'aspect-[3/2]'
            )}
            data-testid="chart-section"
        >
            {children}
        </section>
    );

    if (isLoading)
        return (
            <SectionWrapper>
                <Skeleton h={'full'} />
            </SectionWrapper>
        );

    return (
        <SectionWrapper>
            <header className="flex items-center gap-6">
                <Heading
                    as="h2"
                    title="chart-section-title"
                    className="text-2xl"
                    value={t('header')}
                />

                <YearSelector dashboard={dashboard} />
            </header>

            <BarChart dashboard={dashboard} />
        </SectionWrapper>
    );
};
