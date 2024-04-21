import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Select } from '@/components';

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

export const Sorting: FC<SortingProps> = ({ setSortBy }) => {
    const t = useTranslations('Dashboard.WorkoutList.Header.sorting');

    const SortOptionsMap = [
        { val: [SortOptions.DATE], text: t('dateDesc') },
        { val: [SortOptions.DATE_REVERSE], text: t('dateAsc') },
        { val: [SortOptions.DISTANCE], text: t('distanceDesc') },
        { val: [SortOptions.DISTANCE_REVERSE], text: t('distanceAsc') },
        { val: [SortOptions.DURATION], text: t('durationDesc') },
        { val: [SortOptions.DURATION_REVERSE], text: t('durationAsc') },
        { val: [SortOptions.PACE], text: t('paceDesc') },
        { val: [SortOptions.PACE_REVERSE], text: t('paceAsc') },
    ];

    return (
        <Select
            className="w-52"
            onChange={e => handleSort(e, setSortBy)}
            aria-label={t('ariaLabel')}
        >
            {SortOptionsMap.map((option, idx) => (
                <option key={idx} value={option.val}>
                    {option.text}
                </option>
            ))}
        </Select>
    );
};
