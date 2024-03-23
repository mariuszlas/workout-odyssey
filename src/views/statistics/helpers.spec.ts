import { describe, expect, it } from 'vitest';

import { WorkoutsDashboard } from '@/interfaces';

import { selectPmStatsData, selectSecStatsData } from './helpers';

describe('selectPmStatsData', () => {
    it('returns total data if yearSelected is 0', () => {
        const mockDashboard = {
            total: { someData: 'value' },
        } as unknown as WorkoutsDashboard;
        const result = selectPmStatsData(mockDashboard, 0);
        expect(result).toBe(mockDashboard.total);
    });

    it('returns year data for the selected year', () => {
        const mockDashboard = {
            years: [
                { year: 2021, data: { someYearData: 'value1' } },
                { year: 2023, data: { someYearData: 'value2' } },
            ],
        } as unknown as WorkoutsDashboard;
        const result = selectPmStatsData(mockDashboard, 2023);
        expect(result).toEqual(mockDashboard.years[1]);
    });

    it('returns undefined if dashboard or year data is not found', () => {
        expect(selectPmStatsData(undefined, 2023)).toBeUndefined();
        expect(
            selectPmStatsData({} as unknown as WorkoutsDashboard, 2023)
        ).toBeUndefined();
        expect(
            selectPmStatsData(
                { years: [] } as unknown as WorkoutsDashboard,
                2023
            )
        ).toBeUndefined();
    });
});

describe('selectSecStatsData', () => {
    it('returns year data for secStats if year is 0', () => {
        const mockDashboard = {
            years: [{ year: 2024, data: { someYearData: 'value' } }],
        } as unknown as WorkoutsDashboard;
        const result = selectSecStatsData(mockDashboard, {
            year: 0,
            secStats: 2024,
        });
        expect(result).toEqual(mockDashboard.years[0]);
    });

    it('returns month data for secStats if year is not 0', () => {
        const mockDashboard = {
            months: [
                { year: 2023, month: 11, data: { someMonthData: 'value' } },
            ],
        } as unknown as WorkoutsDashboard;
        const result = selectSecStatsData(mockDashboard, {
            year: 2023,
            secStats: 11,
        });
        expect(result).toEqual(mockDashboard.months[0]);
    });

    it('returns undefined if data is not found', () => {
        expect(
            selectSecStatsData(undefined, { year: 0, secStats: 2023 })
        ).toBeUndefined();
        expect(
            selectSecStatsData({} as unknown as WorkoutsDashboard, {
                year: 0,
                secStats: 2023,
            })
        ).toBeUndefined();
        expect(
            selectSecStatsData({ years: [] } as unknown as WorkoutsDashboard, {
                year: 0,
                secStats: 2023,
            })
        ).toBeUndefined();
        expect(
            selectSecStatsData({ months: [] } as unknown as WorkoutsDashboard, {
                year: 2023,
                secStats: 11,
            })
        ).toBeUndefined();
    });
});
