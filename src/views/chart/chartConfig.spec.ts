import { describe, expect, it, vi } from 'vitest';

import { ChartDataTypes } from '@/interfaces';
import * as helpers from '@/utils/helpers';

import type { BarChartData, BarChartT } from './chart';
import {
    destroyChart,
    formatTooltipValue,
    getDataset,
    OptionParams,
    updateChart,
} from './chartConfig';
import * as c from './constants';

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

        updateChart(chart, data, {} as OptionParams);

        expect(updateChartFn).toHaveBeenCalledTimes(1);
        expect(chart.config.data.datasets[0].data).toEqual(data);
    });

    it('should not update the chart if the chart does not exist', () => {
        const updateChartFn = vi.fn();
        const chart = undefined;

        updateChart(chart, data, {} as OptionParams);

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

describe('formatTooltipValue', () => {
    it('should format value using formatPace when dataType is PACE', () => {
        const value = 123.456;
        const dataType = ChartDataTypes.PACE;

        const mockedFormatPace = vi.spyOn(helpers, 'formatPace');
        const result = formatTooltipValue(value, dataType);

        expect(mockedFormatPace).toHaveBeenCalledWith(value);
        expect(result).toBe('02\'03"');
    });

    it('should format value with no decimal places when dataType is COUNTS', () => {
        const value = 123.456;
        const dataType = ChartDataTypes.COUNTS;

        const result = formatTooltipValue(value, dataType);

        expect(result).toBe('123');
    });

    it('should format value with one decimal place by default', () => {
        const value = 123.456;
        const dataType = 'UNKNOWN' as ChartDataTypes;

        const result = formatTooltipValue(value, dataType);

        expect(result).toBe('123.5');
    });

    it('should format value with one decimal place when dataType is undefined', () => {
        const value = 123.456;
        const dataType = undefined as unknown as ChartDataTypes;

        const result = formatTooltipValue(value, dataType);

        expect(result).toBe('123.5');
    });

    it('should handle integer values correctly', () => {
        const value = 100;
        const dataType = ChartDataTypes.COUNTS;

        const result = formatTooltipValue(value, dataType);

        expect(result).toBe('100');
    });

    it('should handle negative values correctly', () => {
        const value = -123.456;
        const dataType = ChartDataTypes.COUNTS;

        const result = formatTooltipValue(value, dataType);

        expect(result).toBe('-123');
    });

    it('should handle very small values correctly', () => {
        const value = 0.0004;
        const dataType = ChartDataTypes.DISTANCE;

        const result = formatTooltipValue(value, dataType);

        expect(result).toBe('0.0');
    });
});
