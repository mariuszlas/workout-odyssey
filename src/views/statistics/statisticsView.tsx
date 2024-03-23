'use client';

import type { FC } from 'react';

import { useIsBreakpoint } from '@/hooks';
import type { WorkoutsDashboard } from '@/interfaces';
import { useUI } from '@/providers';

import { StatsPanel } from './statsPanel/statsPanel';
import { selectPmStatsData, selectSecStatsData } from './helpers';

interface Props {
    dashboard: WorkoutsDashboard | undefined;
    isLoading?: boolean;
}

export const StatisticsView: FC<Props> = ({ dashboard }) => {
    const isMobileOrTabled = useIsBreakpoint('md');
    const { year, secondaryStat } = useUI();
    const headerData = { year, secStats: secondaryStat };

    const pmStatsData = selectPmStatsData(dashboard, headerData.year);
    const secStatsData = selectSecStatsData(dashboard, headerData);

    return (
        <div className="mt-4 grid w-full grid-cols-2 gap-6">
            <StatsPanel
                data={pmStatsData}
                headerData={headerData}
                isPrimary={true}
            />

            <StatsPanel
                data={secStatsData}
                headerData={headerData}
                isPrimary={false}
                isMobile={isMobileOrTabled}
            />
        </div>
    );
};
