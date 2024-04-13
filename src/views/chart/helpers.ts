import { MouseEvent } from 'react';
import type { ChartConfiguration, TooltipItem } from 'chart.js/auto';

import {
    type BestMonths,
    type MonthStats,
    Theme,
    Units,
    type WorkoutsDashboard,
} from '@/interfaces';

import { getMonthForLocale } from '../helpers';

import type { BarChartData, BarChartT, ChartType } from './chart';
import * as c from './constants';

interface ChartTheme {
    barColor: string;
    hoverBarColor: string;
    textColor: string;
    gridDashColor: string;
}

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

export const getInteractionIndex = (
    event: MouseEvent<HTMLCanvasElement>,
    chart: BarChartT | undefined,
    chartData: BarChartData | undefined
) => {
    if (!chart || !chartData) return;

    return chart
        .getElementsAtEventForMode(
            event.nativeEvent,
            'index',
            { intersect: true },
            false
        )
        .at(0)?.index;
};

export const formatChartTooltip = (
    context: TooltipItem<'bar'>,
    units: Units
) => {
    const parsed = context.parsed.y;
    return `${parsed.toFixed(1)} ${units.km}`;
};

const getChartOptions = (
    chartTheme: ChartTheme,
    locale: string,
    units: Units
): ChartConfiguration<ChartType, BarChartData, string[]>['options'] => ({
    locale,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: { label: context => formatChartTooltip(context, units) },
        },
    },
    elements: {
        bar: {
            backgroundColor: chartTheme.barColor,
            hoverBackgroundColor: chartTheme.hoverBarColor,
        },
    },
    scales: {
        x: {
            ticks: {
                font: { size: c.TICK_FONT_SIZE, family: c.TICK_FONT },
                color: chartTheme.textColor,
            },
            grid: { display: false },
            border: { color: chartTheme.textColor },
        },
        y: {
            ticks: {
                maxTicksLimit: c.MAX_TICK_LIMIT,
                font: { size: c.TICK_FONT_SIZE, family: c.TICK_FONT },
                color: chartTheme.textColor,
            },
            grid: {
                tickColor: chartTheme.textColor,
                color: chartTheme.gridDashColor,
            },
            border: { color: chartTheme.textColor, dash: c.Y_BORDER_DASH },
        },
    },
});

export const getChartConfig = (
    chartData: BarChartData,
    chartTheme: ChartTheme,
    locale: string,
    units: Units
): ChartConfiguration<ChartType, BarChartData, string[]> => ({
    type: c.BAR_TYPE,
    data: getDataset(chartData),
    options: getChartOptions(chartTheme, locale, units),
});

export const updateChartTheme = (
    chart: BarChartT | undefined,
    chartTheme: ChartTheme,
    locale: string,
    units: Units
) => {
    const options = getChartOptions(chartTheme, locale, units);
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
    yearSelected: number,
    locale: string
) => {
    if (!dashboard?.years || !dashboard.months) return [];

    if (yearSelected === 0)
        return dashboard.years.map(yearObj => ({
            x: yearObj.year.toString(),
            y: yearObj.distance,
            value: yearObj.year,
        }));

    return dashboard.months
        .filter(monthObj => monthObj.year === yearSelected)
        .map(monthObj => ({
            x: getMonthForLocale(monthObj.month - 1, locale, 'short'),
            y: monthObj.distance,
            value: monthObj.month,
        }));
};

export const getChartThemeTokens = (theme: Theme | null): ChartTheme => ({
    barColor: theme === Theme.DARK ? c.BAR_COLOR_DARK : c.BAR_COLOR_LIGHT,
    hoverBarColor:
        theme === Theme.DARK ? c.BAR_HOVER_COLOR_DARK : c.BAR_HOVER_COLOR_LIGHT,
    textColor: theme === Theme.DARK ? c.TEXT_COLOR_DARK : c.TEXT_COLOR_LIGHT,
    gridDashColor: c.GRID_DASH_COLOR,
});
