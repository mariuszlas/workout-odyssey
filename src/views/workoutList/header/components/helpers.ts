import type { SortByObject } from '../../workoutList';

import { SortOptions } from './sorting';

const SORT_VALUE_DELIMITER = '-';

export const handleSort = (
    value: SortOptions,
    setSortBy: (sortBy: SortByObject) => void
): void => {
    const split: string[] = value.split(SORT_VALUE_DELIMITER);
    const sortObj: SortByObject = {
        sort: split[0],
        reverse: split[1] === 'reverse' ? true : false,
    };
    setSortBy(sortObj);
};
