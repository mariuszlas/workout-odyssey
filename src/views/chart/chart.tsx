'use client';

import type { FC, MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from 'next-themes';

import { TextP } from '@/components';
import { WorkoutsDashboard } from '@/interfaces';
import { useUI } from '@/providers';

import {
    destroyChart,
    getChartConfig,
    getInteractionIndex,
    updateChart,
    updateChartTheme,
} from './chartConfig';
import { selectChartData } from './helpers';

export type ChartType = 'bar';
export type BarChartData = { x: string; y: number; value: number }[];
export type BarChartT = Chart<ChartType, BarChartData, string[]>;

export const BarChart: FC<{ dashboard: WorkoutsDashboard }> = ({
    dashboard,
}) => {
    const { setSecondaryStat, units, year, dataType } = useUI();
    const { resolvedTheme } = useTheme();
    const ref = useRef<HTMLCanvasElement>(null);
    const [chart, setChart] = useState<BarChartT>();
    const options = { resolvedTheme, units, dataType };

    const chartData = useMemo(
        () => selectChartData(dashboard, year, dataType),
        [dashboard, year, dataType]
    );

    const handleBarClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const interactionIdx = getInteractionIndex(event, chart, chartData);
        if (interactionIdx === undefined) return;

        const secondaryStat = chartData.at(interactionIdx)?.value;
        if (secondaryStat === undefined) return;

        setSecondaryStat(secondaryStat);
    };

    useEffect(() => {
        updateChart(chart, chartData, options);
    }, [chartData, dataType]);

    useEffect(() => {
        if (!ref.current) return;

        const chartConfig = getChartConfig(chartData, options);
        const newChart = new Chart(ref.current, chartConfig);
        setChart(newChart);

        return () => destroyChart(newChart);
    }, []);

    useEffect(() => {
        updateChartTheme(chart, options);
    }, [resolvedTheme]);

    const fallbackContent = <TextP>Workouts chart</TextP>;

    return (
        <canvas ref={ref} role="img" onClick={e => handleBarClick(e)}>
            {fallbackContent}
        </canvas>
    );
};
