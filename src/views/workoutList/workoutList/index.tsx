import type { FC } from 'react';

import { _t, Text } from '@/components/';
import type { Workout, WorkoutTypes } from '@/interfaces';

import type { PageProps } from '../header/components';
import { Pagination } from '../header/components';
import { getPagedWorkouts, getTotalPageNum, sortWorkouts } from '../helpers';

import { WorkoutLineItem } from './workoutLineItem';

const PAGE_SIZE = 10;

export interface SortByObject {
    reverse: boolean;
    sort: string;
}

interface WorkoutListProps extends PageProps {
    workoutType: WorkoutTypes;
    sortBy: SortByObject;
    workouts: Workout[] | undefined;
    isError: boolean;
}

export const WorkoutList: FC<WorkoutListProps> = ({
    workoutType,
    sortBy,
    workouts,
    pageNo,
    setPageNo,
    isError,
}) => {
    if (isError) {
        return (
            <div className="my-6 flex w-full justify-center rounded-lg">
                <Text>{_t.errorFetch}</Text>
            </div>
        );
    }

    if (!workouts?.length) {
        return (
            <div className="flex w-full justify-center p-4">
                <Text data-testid="no-workouts-message">
                    {_t.noWorkoutsMsg}
                </Text>
            </div>
        );
    }

    const sortedWorkouts = sortWorkouts([...workouts], sortBy);
    const pagedWorkouts = getPagedWorkouts(sortedWorkouts, pageNo, PAGE_SIZE);

    return (
        <>
            <ul className="w-full grow">
                {pagedWorkouts.map((item, idx) => (
                    <WorkoutLineItem key={idx} data={item} type={workoutType} />
                ))}
            </ul>

            <Pagination
                pageNo={pageNo}
                setPageNo={setPageNo}
                totalPages={getTotalPageNum(sortedWorkouts, PAGE_SIZE)}
            />
        </>
    );
};
