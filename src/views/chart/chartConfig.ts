import { MouseEvent } from 'react';
import type { ChartConfiguration } from 'chart.js/auto';

import { ChartDataTypes, Theme, Units } from '@/interfaces';
import { formatPace } from '@/utils/helpers';

import type { BarChartData, BarChartT, ChartType } from './chart';
import * as c from './constants';

export interface ChartTheme {
    barColor: string;
    hoverBarColor: string;
    textColor: string;
    gridDashColor: string;
}

export interface OptionParams {
    resolvedTheme: string | undefined;
    units: Units;
    dataType: ChartDataTypes;
    locale?: string;
}

export const getDataset = (data: BarChartData) => ({
    datasets: [{ maxBarThickness: c.MAX_BAR_THICKNESS, data: data }],
});

export const updateChart = (
    chart: BarChartT | undefined,
    data: BarChartData,
    optionParams: OptionParams
) => {
    if (chart) {
        chart.config.data = getDataset(data);
        chart.config.options = getChartOptions(optionParams);
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

export const getChartConfig = (
    chartData: BarChartData,
    optionParams: OptionParams
): ChartConfiguration<ChartType, BarChartData, string[]> => ({
    type: c.BAR_TYPE,
    data: getDataset(chartData),
    options: getChartOptions(optionParams),
});

export const updateChartTheme = (
    chart: BarChartT | undefined,
    optionParams: OptionParams
) => {
    const options = getChartOptions(optionParams);
    if (chart && options) {
        chart.options = options;
        chart.update();
    }
};

export const getChartThemeTokens = (theme: string | undefined): ChartTheme => ({
    barColor: theme === Theme.DARK ? c.BAR_COLOR_DARK : c.BAR_COLOR_LIGHT,
    hoverBarColor:
        theme === Theme.DARK ? c.BAR_HOVER_COLOR_DARK : c.BAR_HOVER_COLOR_LIGHT,
    textColor: theme === Theme.DARK ? c.TEXT_COLOR_DARK : c.TEXT_COLOR_LIGHT,
    gridDashColor:
        theme === Theme.DARK ? c.GRID_DASH_COLOR_DARK : c.GRID_DASH_COLOR_LIGHT,
});

const getTooltipUnits = (units: Units, dataType: ChartDataTypes) => {
    switch (dataType) {
        case ChartDataTypes.DISTANCE:
            return units.km;
        case ChartDataTypes.DURATION:
            return units.h;
        case ChartDataTypes.SPEED:
            return units.kmh;
        case ChartDataTypes.PACE:
            return `/${units.km}`;
        default:
            return '';
    }
};

export const formatTooltipValue = (value: number, dataType: ChartDataTypes) => {
    switch (dataType) {
        case ChartDataTypes.PACE:
            return formatPace(value);
        case ChartDataTypes.COUNTS:
            return value.toFixed(0);
        default:
            return value.toFixed(1);
    }
};

const getChartOptions = ({
    resolvedTheme,
    units,
    dataType,
    locale,
}: OptionParams): ChartConfiguration<
    ChartType,
    BarChartData,
    string[]
>['options'] => {
    const chartTheme = getChartThemeTokens(resolvedTheme);

    if (!locale) locale = 'en-GB';

    return {
        locale,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: context =>
                        `${formatTooltipValue(context.parsed.y, dataType)} ${getTooltipUnits(units, dataType)}`,
                },
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
                    callback: tickValue =>
                        dataType === ChartDataTypes.PACE
                            ? formatPace(Number(tickValue))
                            : tickValue,
                },
                grid: {
                    tickColor: chartTheme.textColor,
                    color: chartTheme.gridDashColor,
                },
                border: { color: chartTheme.textColor, dash: c.Y_BORDER_DASH },
            },
        },
    };
};
