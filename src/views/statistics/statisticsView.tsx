'use client';

import type { FC } from 'react';

import { useIsBreakpoint, useWorkoutType } from '@/hooks';
import type { Dashboarad, Loading } from '@/interfaces';
import { useUI } from '@/providers';
import { cn } from '@/utils/helpers';

import { StatsPanel } from './statsPanel/statsPanel';
import { selectPmStatsData, selectSecStatsData } from './helpers';

export const StatisticsView: FC<Dashboarad & Loading> = ({
    dashboard,
    isLoading,
}) => {
    const isMobile = useIsBreakpoint('md');
    const { year, secondaryStat } = useUI();
    const workoutType = useWorkoutType();

    const headerData = { year, secStats: secondaryStat };
    const pmStatsData = selectPmStatsData(dashboard, year);
    const secStatsData = selectSecStatsData(dashboard, headerData);

    const props = { headerData, workoutType, isLoading };

    return (
        <div
            className={cn('grid w-full grid-cols-2 gap-4', isLoading && 'h-80')}
        >
            <StatsPanel data={pmStatsData} isPrimary {...props} />
            <StatsPanel data={secStatsData} isMobile={isMobile} {...props} />
        </div>
    );
};
