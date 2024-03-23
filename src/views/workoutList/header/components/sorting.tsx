import type { FC } from 'react';

import { _t, Select } from '@/components';

import { handleSort } from './helpers';

interface SortByObject {
    reverse: boolean;
    sort: string;
}

export interface SortingProps {
    setSortBy: (sortBy: SortByObject) => void;
}

export const enum SortOptions {
    DATE = 'date',
    DATE_REVERSE = 'date-reverse',
    DISTANCE = 'distance',
    DISTANCE_REVERSE = 'distance-reverse',
    DURATION = 'duration',
    DURATION_REVERSE = 'duration-reverse',
    PACE = 'pace',
    PACE_REVERSE = 'pace-reverse',
}

const SortOptionsMap = [
    { val: [SortOptions.DATE], text: _t.sortOptDateDesc },
    { val: [SortOptions.DATE_REVERSE], text: _t.sortOptDateAsc },
    { val: [SortOptions.DISTANCE], text: _t.sortOptDistanceDesc },
    { val: [SortOptions.DISTANCE_REVERSE], text: _t.sortOptDistanceAsc },
    { val: [SortOptions.DURATION], text: _t.sortOptDurationDesc },
    { val: [SortOptions.DURATION_REVERSE], text: _t.sortOptDurationAsc },
    { val: [SortOptions.PACE], text: _t.sortOptPaceDesc },
    { val: [SortOptions.PACE_REVERSE], text: _t.sortOptPaceAsc },
];

export const Sorting: FC<SortingProps> = ({ setSortBy }) => (
    <Select
        className="w-52"
        onChange={e => handleSort(e, setSortBy)}
        aria-label="sort workout list"
    >
        {SortOptionsMap.map((option, idx) => (
            <option key={idx} value={option.val}>
                {option.text}
            </option>
        ))}
    </Select>
);
