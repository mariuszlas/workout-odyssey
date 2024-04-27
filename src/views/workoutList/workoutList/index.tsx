import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Text } from '@/components/';
import type { Workout } from '@/interfaces';
import { useUI } from '@/providers';

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
    const t = useTranslations('Dashboard.WorkoutList');

    if (isError) {
        return (
            <div className="my-6 flex w-full justify-center rounded-lg">
                <Text value={t('Body.error')} />
            </div>
        );
    }

    if (!workouts?.length) {
        return (
            <div className="flex w-full justify-center p-4">
                <Text
                    data-testid="no-workouts-message"
                    value={t('Body.noWorkouts')}
                />
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
                t={{
                    nextPage: t('Pagination.aria.nextPage'),
                    previousPage: t('Pagination.aria.previousPage'),
                }}
            />
        </>
    );
};
