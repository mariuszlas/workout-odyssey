import type { HeaderData, Workout } from '@/interfaces';
import { getFormattedMonthAndYear } from '@/utils/helpers';

import { SortOptions } from './header/components/sorting';
import type { SortByObject } from './workoutList';

const DISTANCE_OFFSET = 0.5;

export const filterWorkouts = (
    filterBy: string,
    workouts: Workout[] | undefined
) => {
    if (!workouts) return [];

    const greater = /^>\d+$/;
    const smaller = /^<\d+$/;
    const numberOnly = /^\d+$/;

    if (numberOnly.test(filterBy)) {
        return workouts.filter(
            ({ distance }) =>
                distance > Number(filterBy) - DISTANCE_OFFSET &&
                distance < Number(filterBy) + DISTANCE_OFFSET
        );
    } else if (smaller.test(filterBy)) {
        return workouts.filter(
            ({ distance }) =>
                distance < Number(filterBy.slice(1)) - DISTANCE_OFFSET
        );
    } else if (greater.test(filterBy)) {
        return workouts.filter(
            ({ distance }) =>
                distance > Number(filterBy.slice(1)) + DISTANCE_OFFSET
        );
    }

    return workouts;
};

export const getWorkoutListHeading = (
    { year, secStats }: HeaderData,
    isAll: boolean,
    headers: Record<string, any>,
    locale: string,
    isShortMonth?: boolean
) => {
    if (isAll) return headers['allWorkouts'];

    const date = new Date();
    const isCurrentMonth =
        date.getFullYear() === year && date.getMonth() + 1 === secStats;

    if (year === 0 || isCurrentMonth) return headers['currentMonthWorkouts'];

    return `${headers['generic']} ${getFormattedMonthAndYear(
        year,
        secStats,
        locale,
        isShortMonth
    )}`;
};

export const getTotalPageNum = (sortedWorkouts: Workout[], pageSize: number) =>
    sortedWorkouts && Math.ceil(sortedWorkouts.length / pageSize);

export const getPagedWorkouts = (
    sortedWorkouts: Workout[],
    pageNo: number,
    pageSize: number
) => sortedWorkouts.slice((pageNo - 1) * pageSize, pageNo * pageSize);

export const sortWorkouts = (
    workouts: Workout[],
    sortBy: SortByObject
): Workout[] => {
    let sorted: Workout[];

    if (sortBy.sort === SortOptions.DATE) {
        sorted = workouts.sort(
            (a, b) =>
                new Date(b.timestamp).valueOf() -
                new Date(a.timestamp).valueOf()
        );
    } else {
        sorted = workouts.sort(
            (a: { [key: string]: any }, b: { [key: string]: any }) =>
                b[sortBy.sort] - a[sortBy.sort]
        );
    }

    if (sortBy?.reverse) return sorted.reverse();

    return sorted;
};

export const selectMonthWorkouts = (
    workouts: Workout[] | undefined,
    { year, secStats }: HeaderData
) => {
    if (!workouts) return [];

    const isTotalView = year === 0;

    const [newYear, month]: [number, number] = isTotalView
        ? [new Date().getFullYear(), new Date().getMonth() + 1]
        : [year, secStats];

    return workouts.filter(workout => {
        const date = new Date(workout.timestamp);
        return date.getFullYear() === newYear && date.getMonth() + 1 === month;
    });
};
