'use client';

import type { FC, MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useLocale, useTranslations } from 'next-intl';

import { Text } from '@/components';
import { WorkoutsDashboard } from '@/interfaces';
import { useTheme, useUI } from '@/providers';

import {
    destroyChart,
    getChartConfig,
    getChartThemeTokens,
    getInteractionIndex,
    selectChartData,
    updateChart,
    updateChartTheme,
} from './helpers';

export type ChartType = 'bar';
export type BarChartData = { x: string; y: number; value: number }[];
export type BarChartT = Chart<ChartType, BarChartData, string[]>;

export const BarChart: FC<{ dashboard: WorkoutsDashboard }> = ({
    dashboard,
}) => {
    const t = useTranslations('Dashboard.Chart');
    const locale = useLocale();

    const { setSecondaryStat, units, year } = useUI();
    const [theme] = useTheme();

    const ref = useRef<HTMLCanvasElement>(null);
    const [chart, setChart] = useState<BarChartT>();

    const chartData = useMemo(
        () => selectChartData(dashboard, year, locale),
        [dashboard, year]
    );

    const handleBarClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const interactionIdx = getInteractionIndex(event, chart, chartData);
        if (interactionIdx === undefined) return;

        const secondaryStat = chartData.at(interactionIdx)?.value;
        if (secondaryStat === undefined) return;

        setSecondaryStat(secondaryStat);
    };

    useEffect(() => {
        updateChart(chart, chartData);
    }, [chartData]);

    useEffect(() => {
        if (!ref.current) return;

        const chartConfig = getChartConfig(
            chartData,
            getChartThemeTokens(theme),
            locale,
            units
        );
        const newChart = new Chart(ref.current, chartConfig);
        setChart(newChart);

        return () => destroyChart(newChart);
    }, []);

    useEffect(() => {
        updateChartTheme(chart, getChartThemeTokens(theme), locale, units);
    }, [theme]);

    const fallbackContent = <Text as="p" value={t('chartFallbackContent')} />;

    return (
        <canvas ref={ref} role="img" onClick={e => handleBarClick(e)}>
            {fallbackContent}
        </canvas>
    );
};
