import type { TooltipItem } from 'chart.js/auto';
import { describe, expect, it, vi } from 'vitest';

import { BestMonths, Units, WorkoutsDashboard } from '@/interfaces';

import type { BarChartData, BarChartT } from './chart';
import * as c from './constants';
import {
    destroyChart,
    findBestMonths,
    formatChartTooltip,
    getAvailableYears,
    getDataset,
    getNextYearIdx,
    getPreviousYearIdx,
    getSecStats,
    updateChart,
} from './helpers';

describe('getDataset', () => {
    it('returns correctly formated data object', () => {
        const mockData = [{ x: '2', y: 6 }] as BarChartData;
        const dataset = {
            datasets: [
                { maxBarThickness: c.MAX_BAR_THICKNESS, data: mockData },
            ],
        };
        expect(getDataset(mockData)).toStrictEqual(dataset);
    });
});

describe('updateChart', () => {
    const data = [{ x: 'Jun', y: 2, value: 6 }];

    it('should update the chart if the chart exists', () => {
        const updateChartFn = vi.fn();
        const chart = {
            config: {
                data: {
                    datasets: [{ maxBarThickness: 10, data: [] }],
                },
            },
            update: updateChartFn,
        } as unknown as BarChartT;

        updateChart(chart, data);

        expect(updateChartFn).toHaveBeenCalledTimes(1);
        expect(chart.config.data.datasets[0].data).toEqual(data);
    });

    it('should not update the chart if the chart does not exist', () => {
        const updateChartFn = vi.fn();
        const chart = undefined;

        updateChart(chart, data);

        expect(updateChartFn).not.toHaveBeenCalled();
        expect(chart).toBeUndefined();
    });
});

describe('destroyChart', () => {
    it("should call the 'destroy' function on the chart", () => {
        const destroyChartFn = vi.fn();
        const chart = {
            config: {
                data: {
                    datasets: [{ maxBarThickness: 10, data: [] }],
                },
            },
            destroy: destroyChartFn,
        } as unknown as BarChartT;

        destroyChart(chart);
        expect(destroyChartFn).toHaveBeenCalledTimes(1);
    });
});

describe('formatChartTooltip', () => {
    it('should return a formatted tooltip string for a valid value', () => {
        const context = {
            parsed: { y: 12.345 },
        } as unknown as TooltipItem<'bar'>;

        const actual = formatChartTooltip(context, { km: 'km' } as Units);

        expect(actual).toEqual('12.3 km');
    });
});

describe('getSecStats', () => {
    const bestMonths = {
        '12345': { month: 12, distance: 12345 },
    } as unknown as BestMonths;

    it('should return the current year for the total value', () => {
        const value = 0;
        const actual = getSecStats(value, bestMonths);

        expect(actual).toEqual(new Date().getFullYear());
    });

    it('should return the current month for the current year value', () => {
        const value = new Date().getFullYear();
        const actual = getSecStats(value, bestMonths);

        expect(actual).toEqual(new Date().getMonth() + 1);
    });

    it('should return the best month for the other values', () => {
        const value = 12345;
        const actual = getSecStats(value, bestMonths);

        expect(actual).toEqual(12);
    });
});

describe('getNextYearIdx', () => {
    it('should return the index of the previous year', () => {
        expect(getNextYearIdx(1)).toEqual(0);
        expect(getNextYearIdx(2)).toEqual(1);
        expect(getNextYearIdx(3)).toEqual(2);
    });

    it('should return 0 for the first year', () => {
        expect(getNextYearIdx(0)).toEqual(0);
    });
});

describe('getPreviousYearIdx', () => {
    it('should return the index of the next year', () => {
        expect(getPreviousYearIdx(0, 3)).toEqual(1);
        expect(getPreviousYearIdx(1, 3)).toEqual(2);
        expect(getPreviousYearIdx(2, 3)).toEqual(2);
    });

    it('should return the last index for the last year', () => {
        expect(getPreviousYearIdx(2, 2)).toEqual(2);
    });
});

describe('getAvailableYears', () => {
    it('should return an empty array when dashboard is undefined', () => {
        const availableYears = getAvailableYears(
            undefined as unknown as WorkoutsDashboard
        );
        expect(availableYears).toEqual([]);
    });

    it('should return an empty array when dashboard does not have years', () => {
        const dashboard = { years: [] } as unknown as WorkoutsDashboard;
        const availableYears = getAvailableYears(dashboard);
        expect(availableYears).toEqual([]);
    });

    it('should return an array of years when dashboard has years', () => {
        const dashboard = {
            years: [{ year: 2022 }, { year: 2020 }, { year: 2019 }],
        } as WorkoutsDashboard;
        const availableYears = getAvailableYears(dashboard);
        expect(availableYears).toEqual([2019, 2020, 2022]);
    });
});

describe('findBestMonths', () => {
    it('should return an empty object if the dashboard is empty', () => {
        const dashboard = {} as unknown as WorkoutsDashboard;
        const actual = findBestMonths(dashboard);

        expect(actual).toEqual({});
    });

    it('should return the month with the maximum distance for each year', () => {
        const dashboard = {
            months: [
                { year: 2022, distance: 1 },
                { year: 2022, distance: 10 },
                { year: 2022, distance: 5 },
                { year: 2023, distance: 15 },
            ],
        } as unknown as WorkoutsDashboard;

        const actual = findBestMonths(dashboard);

        expect(actual).toEqual({
            '2022': dashboard.months[1],
            '2023': dashboard.months[3],
        });
    });
});
