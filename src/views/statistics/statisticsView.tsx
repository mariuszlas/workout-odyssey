'use client';

import type { FC } from 'react';
import { usePathname } from 'next/navigation';

import { useIsBreakpoint } from '@/hooks';
import type { WorkoutsDashboard } from '@/interfaces';
import { useUI } from '@/providers';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

import { StatsPanel } from './statsPanel/statsPanel';
import { selectPmStatsData, selectSecStatsData } from './helpers';

interface Props {
    dashboard: WorkoutsDashboard | undefined;
    isLoading?: boolean;
}

export const StatisticsView: FC<Props> = ({ dashboard }) => {
    const pathname = usePathname();
    const isMobileOrTabled = useIsBreakpoint('md');
    const { year, secondaryStat } = useUI();

    const headerData = { year, secStats: secondaryStat };
    const workoutType = getWorkoutTypeFromPathname(pathname);

    const pmStatsData = selectPmStatsData(dashboard, year);
    const secStatsData = selectSecStatsData(dashboard, headerData);

    return (
        <div className="mt-4 grid w-full grid-cols-2 gap-6">
            <StatsPanel
                data={pmStatsData}
                headerData={headerData}
                isPrimary={true}
                workoutType={workoutType}
            />

            <StatsPanel
                data={secStatsData}
                headerData={headerData}
                isMobile={isMobileOrTabled}
                workoutType={workoutType}
            />
        </div>
    );
};
