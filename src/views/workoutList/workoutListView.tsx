'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { SkeletonList } from '@/components';
import { useWorkoutType } from '@/hooks';
import { Children, Workout } from '@/interfaces';
import { useUI } from '@/providers';

import { WorkoutListHeader } from './header';
import { filterWorkouts, selectMonthWorkouts } from './helpers';
import { WorkoutList } from './workoutList';

const WorkoutListWrapper: FC<Children> = ({ children }) => (
    <section
        className="flex flex-col gap-2 text-card-foreground sm:rounded-lg sm:border sm:bg-card sm:p-6 sm:shadow-sm lg:min-h-full"
        data-testid="workout-list-section"
    >
        {children}
    </section>
);

export const WorkoutListView: FC<{ data?: Workout[]; isLoading?: boolean }> = ({
    data = [],
    isLoading,
}) => {
    const workoutType = useWorkoutType();
    const { year, secondaryStat } = useUI();
    const headerData = { year, secStats: secondaryStat };

    const [sortBy, setSortBy] = useState({ sort: 'date', reverse: false });
    const [filterBy, setFilterBy] = useState('');
    const [isAll, setIsAll] = useState(false);
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        setPageNo(1);
    }, [workoutType, year, secondaryStat]);

    if (isLoading)
        return (
            <WorkoutListWrapper>
                <SkeletonList length={4} h={14} />
            </WorkoutListWrapper>
        );

    const monthWorkouts = selectMonthWorkouts(data, headerData);
    const workouts = isAll ? data : monthWorkouts;
    const filterdWks = filterWorkouts(filterBy, workouts);

    return (
        <WorkoutListWrapper>
            <WorkoutListHeader
                headerData={headerData}
                setSortBy={setSortBy}
                sortBy={sortBy}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                isAll={isAll}
                setIsAll={setIsAll}
                setPageNo={setPageNo}
            />
            <WorkoutList
                sortBy={sortBy}
                workouts={filterdWks}
                pageNo={pageNo}
                setPageNo={setPageNo}
                isError={false}
            />
        </WorkoutListWrapper>
    );
};
