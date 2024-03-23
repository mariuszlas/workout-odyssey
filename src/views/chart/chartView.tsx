'use client';

import type { FC } from 'react';
import { useMemo } from 'react';

import { _t, Heading, Text } from '@/components';
import type { WorkoutsDashboard } from '@/interfaces';
import { useUI } from '@/providers';

import { BarChart } from './chart';
import { selectChartData } from './helpers';
import { YearSelector } from './yearSelector';

interface Props {
    dashboard: WorkoutsDashboard;
}

const Chart: FC<{ dashboard: WorkoutsDashboard }> = ({ dashboard }) => {
    const { year } = useUI();

    const chartData = useMemo(
        () => selectChartData(dashboard, year),
        [dashboard, year]
    );

    return (
        <>
            {chartData ? (
                <BarChart chartData={chartData} />
            ) : (
                <div className="my-6 flex w-full justify-center">
                    <Text>{_t.noWorkoutsMsg}</Text>
                </div>
            )}
        </>
    );
};

export const ChartView: FC<Props> = ({ dashboard }) => (
    <section
        className="flex flex-col items-center gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg"
        data-testid="chart-section"
    >
        <header className="flex items-center gap-6">
            <Heading as="h2" title="chart-section-title">
                {_t.chartSectionH}
            </Heading>

            <YearSelector dashboard={dashboard} />
        </header>

        {/* <Suspense fallback={<SkeletonList length={4} />}> */}
        <Chart dashboard={dashboard} />
        {/* </Suspense> */}
    </section>
);
