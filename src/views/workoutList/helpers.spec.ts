import { describe, expect, it } from 'vitest';

import { Workout } from '@/interfaces';

import { _t } from '..';

import { SortOptions } from './header/components/sorting';
import {
    filterWorkouts,
    getPagedWorkouts,
    getTotalPageNum,
    sortWorkouts,
} from './helpers';
import { SortByObject } from './workoutList';

describe('filterWorkouts', () => {
    const workouts = [
        { distance: 9 },
        { distance: 10 },
        { distance: 10.3 },
        { distance: 10.6 },
        { distance: 11 },
    ] as unknown as Workout[];

    it('should return an empty array if workouts is undefined', () => {
        const workouts = undefined;
        const filterBy = '10';

        const actual = filterWorkouts(filterBy, workouts);

        expect(actual).toEqual([]);
    });

    it('should return all workouts if filterBy is not a number', () => {
        const filterBy = 'abc';
        const actual = filterWorkouts(filterBy, workouts);

        expect(actual).toEqual(workouts);
    });

    it('should return workouts within the specified distance if filterBy can be coerced to a valid number', () => {
        const filterBy = '10';
        const actual = filterWorkouts(filterBy, workouts);

        expect(actual).toEqual([workouts[1], workouts[2]]);
    });

    it('should return workouts greater than the specified distance if filterBy starts with >', () => {
        const filterBy = '>10';
        const actual = filterWorkouts(filterBy, workouts);

        expect(actual).toEqual([workouts[3], workouts[4]]);
    });

    it('should return workouts less than the specified distance if filterBy starts with <', () => {
        const filterBy = '<10';
        const actual = filterWorkouts(filterBy, workouts);

        expect(actual).toEqual([workouts[0]]);
    });
});

describe('sortWorkouts', () => {
    it('should sort by date if sortBy.sort is SortOptions.DATE', () => {
        const workouts = [
            { timestamp: new Date('2023-01-01') },
            { timestamp: new Date('2023-01-03') },
            { timestamp: new Date('2023-01-02') },
        ] as unknown as Workout[];

        const sortBy: SortByObject = {
            sort: SortOptions.DATE,
            reverse: false,
        };

        const expected = [workouts[1], workouts[2], workouts[0]];
        const actual = sortWorkouts(workouts, sortBy);

        expect(actual).toEqual(expected);
    });

    it('should sort by the specified property if sortBy.sort is not SortOptions.DATE', () => {
        const workouts = [
            { distance: 10 },
            { distance: 30 },
            { distance: 20 },
        ] as unknown as Workout[];

        const sortBy: SortByObject = {
            sort: SortOptions.DISTANCE,
            reverse: false,
        };

        const expected = [workouts[1], workouts[2], workouts[0]];
        const actual = sortWorkouts(workouts, sortBy);

        expect(actual).toEqual(expected);
    });

    it('should reverse the sort order if sortBy.reverse is true', () => {
        const workouts = [
            { distance: 10 },
            { distance: 30 },
            { distance: 20 },
        ] as unknown as Workout[];

        const sortBy: SortByObject = {
            sort: SortOptions.DISTANCE,
            reverse: true,
        };

        const expected = [workouts[0], workouts[2], workouts[1]];
        const actual = sortWorkouts(workouts, sortBy);

        expect(actual).toEqual(expected);
    });
});

describe('getTotalPageNum', () => {
    it('should return 0 if there are no workouts', () => {
        const workouts: Workout[] = [];
        const pageSize = 10;
        const expectedTotalPageNum = 0;
        const actualTotalPageNum = getTotalPageNum(workouts, pageSize);
        expect(actualTotalPageNum).toBe(expectedTotalPageNum);
    });

    it('should return the correct total page number if there are workouts', () => {
        const workouts = [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
        ] as unknown as Workout[];

        const pageSize = 4;
        const expectedTotalPageNum = 3;
        const actualTotalPageNum = getTotalPageNum(workouts, pageSize);
        expect(actualTotalPageNum).toBe(expectedTotalPageNum);
    });
});

describe('getPagedWorkouts', () => {
    const workouts = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ] as unknown as Workout[];

    it('should return an empty array if there are no workouts', () => {
        const workouts: Workout[] = [];
        const pageNo = 1;
        const pageSize = 10;
        const expected: Workout[] = [];

        const actual = getPagedWorkouts(workouts, pageNo, pageSize);

        expect(actual).toEqual(expected);
    });

    it('should return the first page of workouts if there are enough workouts', () => {
        const pageNo = 1;
        const pageSize = 2;
        const expected = [workouts[0], workouts[1]];

        const actual = getPagedWorkouts(workouts, pageNo, pageSize);

        expect(actual).toEqual(expected);
    });

    it('should return the second page of workouts if there are more than enough workouts', () => {
        const pageNo = 2;
        const pageSize = 3;
        const expected = [workouts[3], workouts[4]];

        const actual = getPagedWorkouts(workouts, pageNo, pageSize);

        expect(actual).toEqual(expected);
    });
});
