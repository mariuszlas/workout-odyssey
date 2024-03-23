import { MouseEvent } from 'react';
import type { ChartConfiguration, TooltipItem } from 'chart.js/auto';

import { _t } from '@/constants';
import {
    type BestMonths,
    type MonthStats,
    Theme,
    type WorkoutsDashboard,
} from '@/interfaces';

import { getMonth } from '../helpers';

import type { BarChartData, BarChartT, ChartTheme, ChartType } from './chart';
import * as c from './constants';

export const getDataset = (data: BarChartData) => ({
    datasets: [{ maxBarThickness: c.MAX_BAR_THICKNESS, data: data }],
});

export const updateChart = (
    chart: BarChartT | undefined,
    data: BarChartData
) => {
    if (chart) {
        chart.config.data = getDataset(data);
        chart.update();
    }
};

export const destroyChart = (chart: BarChartT) => {
    chart.destroy();
};

export const getMonthFromString = (monthName: string) =>
    'JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(monthName) / 3 + 1;

export const getSecondaryStat = (
    event: MouseEvent<HTMLCanvasElement>,
    chart: BarChartT | undefined,
    chartData: BarChartData | undefined
) => {
    if (!chart || !chartData) return;

    const interactions = chart.getElementsAtEventForMode(
        event.nativeEvent,
        'index',
        { intersect: true },
        false
    );

    if (interactions.length === 0) return;

    const dataPoints = chartData[interactions[0].index];
    const xDataKey = dataPoints.x;
    const value = parseInt(xDataKey);

    return Number.isNaN(value) ? getMonthFromString(xDataKey) : value;
};

export const formatChartTooltip = (context: TooltipItem<'bar'>) => {
    const parsed = context.parsed.y;
    return `${parsed.toFixed(1)} ${_t.km}`;
};

const getChartOptions = (
    chartTheme: ChartTheme
): ChartConfiguration<ChartType, BarChartData, string[]>['options'] => ({
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: { label: context => formatChartTooltip(context) },
        },
    },
    elements: {
        bar: { backgroundColor: chartTheme.barColor },
    },
    scales: {
        x: {
            ticks: {
                font: {
                    size: c.TICK_FONT_SIZE,
                    family: c.TICK_FONT,
                },
                color: chartTheme.textColor,
            },
            grid: {
                display: false,
            },
            border: {
                color: chartTheme.textColor,
            },
        },
        y: {
            ticks: {
                maxTicksLimit: c.MAX_TICK_LIMIT,
                font: {
                    size: c.TICK_FONT_SIZE,
                    family: c.TICK_FONT,
                },
                color: chartTheme.textColor,
            },
            grid: {
                tickColor: chartTheme.textColor,
                color: chartTheme.gridDashColor,
            },
            border: {
                color: chartTheme.textColor,
                dash: c.Y_BORDER_DASH,
            },
        },
    },
});

export const getChartConfig = (
    chartData: BarChartData,
    chartTheme: ChartTheme
): ChartConfiguration<ChartType, BarChartData, string[]> => ({
    type: c.BAR_TYPE,
    data: getDataset(chartData),
    options: getChartOptions(chartTheme),
});

export const updateChartTheme = (
    chart: BarChartT | undefined,
    chartTheme: ChartTheme
) => {
    const options = getChartOptions(chartTheme);
    if (chart && options) {
        chart.options = options;
        chart.update();
    }
};

export const getSecStats = (
    year: number,
    bestMonths: BestMonths | undefined
) => {
    const now = new Date();
    const [currYear, currMonth] = [now.getFullYear(), now.getMonth() + 1];
    const isTotal = year === 0;
    const isCurrentYearSelected = year === currYear;

    let secStats;
    if (isTotal) {
        secStats = currYear;
    } else if (isCurrentYearSelected) {
        secStats = currMonth;
    } else {
        secStats = bestMonths?.[year.toString()]?.month ?? currMonth;
    }
    return secStats;
};

export const getNextYearIdx = (currIdx: number) =>
    currIdx - 1 < 0 ? 0 : currIdx - 1;

export const getPreviousYearIdx = (currIdx: number, arrLength: number) =>
    currIdx + 1 >= arrLength ? currIdx : currIdx + 1;

export const findBestMonths = (dashboard: WorkoutsDashboard) => {
    const bestMonths: Record<string, MonthStats> = {};

    dashboard?.months?.forEach(monthObj => {
        const year = monthObj.year.toString();
        if (year in bestMonths) {
            const currMonth = bestMonths[year];
            const currDistance = currMonth.distance;

            if (currDistance < monthObj.distance) {
                bestMonths[year] = monthObj;
            }
        } else {
            bestMonths[year] = monthObj;
        }
    });

    return bestMonths;
};

export const getAvailableYears = (dashboard: WorkoutsDashboard) =>
    dashboard?.years?.map(yearObj => yearObj.year).reverse() ?? [];

export const selectChartData = (
    dashboard: WorkoutsDashboard | undefined,
    yearSelected: number
) => {
    if (!dashboard?.years || !dashboard.months) return [];

    if (yearSelected === 0)
        return dashboard.years.map(yearObj => ({
            x: yearObj.year.toString(),
            y: yearObj.distance,
        }));

    return dashboard.months
        .filter(monthObj => monthObj.year === yearSelected)
        .map(monthObj => ({
            x: getMonth(monthObj.month - 1, true),
            y: monthObj.distance,
        }));
};

export const getChartThemeTokens = (theme: Theme | null) => ({
    barColor: theme === Theme.LIGHT ? c.BAR_COLOR_LIGHT : c.BAR_COLOR_DARK,
    textColor: theme === Theme.LIGHT ? c.TEXT_COLOR_LIGHT : c.TEXT_COLOR_DARK,
    gridDashColor: c.GRID_DASH_COLOR,
});
