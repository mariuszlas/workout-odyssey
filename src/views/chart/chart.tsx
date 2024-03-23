'use client';

import type { FC, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import { useTheme, useUI } from '@/providers';

import {
    destroyChart,
    getChartConfig,
    getChartThemeTokens,
    getSecondaryStat,
    updateChart,
    updateChartTheme,
} from './helpers';

export type ChartType = 'bar';
export type BarChartData = { x: string; y: number }[] | null;
export type BarChartT = Chart<ChartType, BarChartData, string[]>;

interface ChartProps {
    chartData: BarChartData;
}

export interface ChartTheme {
    barColor: string;
    textColor: string;
    gridDashColor: string;
}

export const BarChart: FC<ChartProps> = ({ chartData }) => {
    const { setSecondaryStat } = useUI();
    const ref = useRef<HTMLCanvasElement>(null);
    const [theme] = useTheme();
    const [chart, setChart] = useState<BarChartT>();

    const handleBarClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const secondaryStat = getSecondaryStat(event, chart, chartData);
        if (secondaryStat) setSecondaryStat(secondaryStat);
    };

    useEffect(() => {
        updateChart(chart, chartData);
    }, [chartData]);

    useEffect(() => {
        if (!ref.current) return;

        const chartConfig = getChartConfig(
            chartData,
            getChartThemeTokens(theme)
        );
        const newChart = new Chart(ref.current, chartConfig);
        setChart(newChart);

        return () => destroyChart(newChart);
    }, []);

    useEffect(() => {
        updateChartTheme(chart, getChartThemeTokens(theme));
    }, [theme]);

    const fallbackContent = <p>Workouts chart</p>;

    return (
        <canvas
            ref={ref}
            role="img"
            aria-label="chart"
            onClick={e => handleBarClick(e)}
        >
            {fallbackContent}
        </canvas>
    );
};
