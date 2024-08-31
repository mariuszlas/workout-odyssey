'use client';

import { FC, useEffect, useMemo } from 'react';
import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons';

import {
    IconButton,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';
import { useWorkoutType } from '@/hooks';
import { type WorkoutsDashboard } from '@/interfaces';
import { useUI } from '@/providers';

import {
    findBestMonths,
    getAvailableYears,
    getNextYearIdx,
    getPreviousYearIdx,
    getSecStats,
} from './helpers';

interface Props {
    dashboard: WorkoutsDashboard;
}

const NEXT = 'NEXT';
const PREV = 'PREVIOUS';

export const YearSelector: FC<Props> = ({ dashboard }) => {
    const { year, setYear, setSecondaryStat } = useUI();
    const workoutType = useWorkoutType();

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
                : (availableYears.at(0) ?? year);

        const secStat = getSecStats(nextYear, bestMonths);

        setYear(nextYear);
        setSecondaryStat(secStat);
    }, [workoutType]);

    if (!availableYears?.length) return null;

    const onSelectYear = (newYear: string) => {
        const secStat = getSecStats(parseInt(newYear), bestMonths);

        setYear(parseInt(newYear));
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

    const getOptions = (availableYears: number[]) => {
        const options = availableYears.map((year, idx) => (
            <SelectItem key={idx + 1} value={year.toString()}>
                {year}
            </SelectItem>
        ));
        options.unshift(
            <SelectItem key={0} value="0">
                All Years
            </SelectItem>
        );
        return options;
    };

    return (
        <div className="flex items-center gap-1" data-testid="year-selector">
            <IconButton
                aria-label="Select next year"
                onClick={() => onChangeYear(NEXT)}
            >
                <TriangleLeftIcon className="h-8 w-8" />
            </IconButton>
            <Select onValueChange={onSelectYear} value={year.toString()}>
                <SelectTrigger className="w-28">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>{getOptions(availableYears)}</SelectGroup>
                </SelectContent>
            </Select>
            <IconButton
                aria-label="Select previous year"
                onClick={() => onChangeYear(PREV)}
            >
                <TriangleRightIcon className="h-8 w-8" />
            </IconButton>
        </div>
    );
};
