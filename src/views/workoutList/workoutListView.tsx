'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Workout, WorkoutTypes } from '@/interfaces';
import { useUI } from '@/providers';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

import { WorkoutListHeader } from './header';
import { filterWorkouts, selectMonthWorkouts } from './helpers';
import { WorkoutList } from './workoutList';

interface Props {
    data: Workout[] | undefined;
}

export const WorkoutListView: FC<Props> = ({ data }) => {
    const { year, secondaryStat } = useUI();
    const headerData = { year, secStats: secondaryStat };

    const pathname = usePathname();
    const workoutType = getWorkoutTypeFromPathname(pathname);

    const allWorkouts = data ?? [];
    const monthWorkouts = selectMonthWorkouts(data, headerData);

    const [sortBy, setSortBy] = useState({ sort: 'date', reverse: false });
    const [filterBy, setFilterBy] = useState('');
    const [isAll, setIsAll] = useState(false);
    const [pageNo, setPageNo] = useState(1);

    const workouts = isAll ? allWorkouts : monthWorkouts;
    const filterdWks = filterWorkouts(filterBy, workouts);

    useEffect(() => {
        setPageNo(1);
    }, [workoutType, year, secondaryStat]);

    return (
        <>
            <WorkoutListHeader
                headerData={headerData}
                setSortBy={setSortBy}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                isAll={isAll}
                setIsAll={setIsAll}
                setPageNo={setPageNo}
            />

            <WorkoutList
                workoutType={workoutType as WorkoutTypes}
                sortBy={sortBy}
                workouts={filterdWks}
                pageNo={pageNo}
                setPageNo={setPageNo}
                isError={false}
            />
        </>
    );
};
