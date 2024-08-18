'use client';

import type { FC } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { useIsBreakpoint } from '@/hooks';
import type { Dashboarad, Loading } from '@/interfaces';
import { useUI } from '@/providers';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

import { StatsPanel } from './statsPanel/statsPanel';
import { selectPmStatsData, selectSecStatsData } from './helpers';

export const StatisticsView: FC<Dashboarad & Loading> = ({
    dashboard,
    isLoading,
}) => {
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
                'grid w-full grid-cols-2 gap-4',
                isLoading && 'h-80'
            )}
        >
            <StatsPanel data={pmStatsData} isPrimary {...props} />
            <StatsPanel data={secStatsData} isMobile={isMobile} {...props} />
        </div>
    );
};
