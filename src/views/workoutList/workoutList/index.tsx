import type { FC } from 'react';

import { TextP } from '@/components/';
import type { Workout } from '@/interfaces';
import { useUI } from '@/providers';

import type { PageProps } from '../header/components';
import { Pagination } from '../header/components';
import { getPagedWorkouts, getTotalPageNum, sortWorkouts } from '../helpers';

import { WorkoutLineItem } from './workoutLineItem';

const PAGE_SIZE = 11;

export interface SortByObject {
    reverse: boolean;
    sort: string;
}

interface WorkoutListProps extends PageProps {
    sortBy: SortByObject;
    workouts: Workout[] | undefined;
    isError: boolean;
}

export const WorkoutList: FC<WorkoutListProps> = ({
    sortBy,
    workouts,
    pageNo,
    setPageNo,
    isError,
}) => {
    const { units } = useUI();

    if (isError) {
        return (
            <div className="my-6 flex w-full justify-center rounded-lg">
                <TextP>Failed to fetch data</TextP>
            </div>
        );
    }

    if (!workouts?.length) {
        return (
            <div className="flex w-full justify-center p-4">
                <TextP data-testid="no-workouts-message">No workouts</TextP>
            </div>
        );
    }

    const sortedWorkouts = sortWorkouts([...workouts], sortBy);
    const pagedWorkouts = getPagedWorkouts(sortedWorkouts, pageNo, PAGE_SIZE);

    return (
        <>
            <ul className="w-full grow">
                {pagedWorkouts.map((item, idx) => (
                    <WorkoutLineItem key={idx} data={item} units={units} />
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
