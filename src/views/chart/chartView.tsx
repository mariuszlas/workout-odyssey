import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Heading } from '@/components';
import type { WorkoutsDashboard } from '@/interfaces';

import { ChartSection } from './chart';
import { YearSelector } from './yearSelector';

export interface Props {
    dashboard: WorkoutsDashboard;
}

export const ChartView: FC<Props> = ({ dashboard }) => {
    const t = useTranslations('Dashboard.Chart');

    return (
        <section
            className="flex flex-col items-center gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg"
            data-testid="chart-section"
        >
            <header className="flex items-center gap-6">
                <Heading
                    as="h2"
                    title="chart-section-title"
                    className="text-2xl"
                    value={t('header')}
                />

                <YearSelector dashboard={dashboard} />
            </header>

            <ChartSection dashboard={dashboard} />
        </section>
    );
};
