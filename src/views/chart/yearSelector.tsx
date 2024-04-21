'use client';

import { type ChangeEvent, FC, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { ArrowLeft, ArrowRight, IconButton, Select } from '@/components';
import type { BestMonths, WorkoutsDashboard } from '@/interfaces';
import { usePathname } from '@/navigation';
import { useUI } from '@/providers';
import { getWorkoutTypeFromPathname } from '@/utils/helpers';

import {
    findBestMonths,
    getAvailableYears,
    getNextYearIdx,
    getPreviousYearIdx,
    getSecStats,
} from './helpers';

interface Props {
    availableYears?: number[];
    bestMonths?: BestMonths | undefined;
    dashboard: WorkoutsDashboard;
}

const NEXT = 'NEXT';
const PREV = 'PREVIOUS';

export const YearSelector: FC<Props> = ({ dashboard }) => {
    const { year, setYear, setSecondaryStat } = useUI();
    const pathname = usePathname();
    const workoutType = getWorkoutTypeFromPathname(pathname);

    const t = useTranslations('Dashboard.Chart');

    const availableYears = useMemo(
        () => getAvailableYears(dashboard),
        [dashboard, workoutType]
    );

    const bestMonths = useMemo(
        () => findBestMonths(dashboard),
        [dashboard, workoutType]
    );

    useEffect(() => {
        const nextYear =
            availableYears.includes(year) || year === 0
                ? year
                : availableYears.at(0) ?? year;

        const secStat = getSecStats(nextYear, bestMonths);

        setYear(nextYear);
        setSecondaryStat(secStat);
    }, [workoutType]);

    if (!availableYears?.length) return null;

    const getOptions = (availableYears: number[]) => {
        const options = availableYears.map((year, idx) => (
            <option key={idx + 1} value={year}>
                {year}
            </option>
        ));
        options.unshift(
            <option key={0} value={0}>
                {t('yearTotal')}
            </option>
        );
        return options;
    };

    const onSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
        const newYear = Number(e.target.value);
        const secStat = getSecStats(newYear, bestMonths);

        setYear(newYear);
        setSecondaryStat(secStat);
    };

    const onChangeYear = (direction: string) => {
        const years = [...availableYears];
        years.unshift(0);
        const currIdx = years.indexOf(year);

        const newIdx =
            direction === NEXT
                ? getNextYearIdx(currIdx)
                : getPreviousYearIdx(currIdx, years.length);

        const newYear = years[newIdx];
        const secStat = getSecStats(newYear, bestMonths);

        setYear(newYear);
        setSecondaryStat(secStat);
    };

    return (
        <div className="flex items-center gap-3" data-testid="year-selector">
            <IconButton
                aria-label={t('aria.nextYear')}
                onClick={() => onChangeYear(NEXT)}
            >
                <ArrowLeft />
            </IconButton>

            <Select
                className="w-full max-w-xs"
                value={year}
                data-testid="data-year-selector-dropdown"
                aria-label={t('aria.yearSelector')}
                onChange={onSelectYear}
            >
                {getOptions(availableYears)}
            </Select>

            <IconButton
                aria-label={t('aria.previousYear')}
                onClick={() => onChangeYear(PREV)}
            >
                <ArrowRight />
            </IconButton>
        </div>
    );
};
