'use client';

import type { FC } from 'react';
import clsx from 'clsx';

import { useIsBreakpoint } from '@/hooks';
import type { WorkoutsDashboard } from '@/interfaces';
import { usePathname } from '@/navigation';
import { useUI } from '@/providers';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

import { StatsPanel } from './statsPanel/statsPanel';
import { selectPmStatsData, selectSecStatsData } from './helpers';

interface Props {
    dashboard?: WorkoutsDashboard;
    isLoading?: boolean;
}

export const StatisticsView: FC<Props> = ({ dashboard, isLoading }) => {
    const isMobile = useIsBreakpoint('md');
    const { year, secondaryStat } = useUI();

    const pathname = usePathname();
    const workoutType = getWorkoutTypeFromPathname(pathname);

    const headerData = { year, secStats: secondaryStat };
    const pmStatsData = selectPmStatsData(dashboard, year);
    const secStatsData = selectSecStatsData(dashboard, headerData);

    const props = { headerData, workoutType, isLoading };

    return (
        <div
            className={clsx(
                'mt-4 grid w-full grid-cols-2 gap-6',
                isLoading && 'h-80'
            )}
        >
            <StatsPanel data={pmStatsData} isPrimary {...props} />
            <StatsPanel data={secStatsData} isMobile={isMobile} {...props} />
        </div>
    );
};
