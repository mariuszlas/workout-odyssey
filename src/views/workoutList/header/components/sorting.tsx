import type { FC } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components';

import { handleSort } from './helpers';

interface SortByObject {
    reverse: boolean;
    sort: string;
}

export interface SortingProps {
    sortBy: SortByObject;
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

export const Sorting: FC<SortingProps> = ({ setSortBy, sortBy }) => {
    const SortOptionsMap = [
        { val: SortOptions.DATE, text: 'Date - earliest first' },
        { val: SortOptions.DATE_REVERSE, text: 'Date - oldest first' },
        { val: SortOptions.DISTANCE, text: 'Distance - longest first' },
        {
            val: SortOptions.DISTANCE_REVERSE,
            text: 'Distance - shortest first',
        },
        { val: SortOptions.DURATION, text: 'Duration - longest first' },
        {
            val: SortOptions.DURATION_REVERSE,
            text: 'Duration - shortest first',
        },
        { val: SortOptions.PACE, text: 'Pace - slowest first' },
        { val: SortOptions.PACE_REVERSE, text: 'Pace - fastest first' },
    ];

    return (
        <Select
            onValueChange={(e: SortOptions) => handleSort(e, setSortBy)}
            value={sortBy.sort}
        >
            <SelectTrigger className="w-52">
                <SelectValue placeholder={sortBy.sort} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {SortOptionsMap.map((option, idx) => (
                        <SelectItem key={idx} value={option.val}>
                            {option.text}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
