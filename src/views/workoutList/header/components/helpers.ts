import { ChangeEvent } from 'react';

import type { SortByObject } from '../../workoutList';

const SORT_VALUE_DELIMITER = '-';

export const handleSort = (
    e: ChangeEvent<HTMLSelectElement>,
    setSortBy: (sortBy: SortByObject) => void
): void => {
    e.preventDefault();

    const split: string[] = e.target.value.split(SORT_VALUE_DELIMITER);
    const sortObj: SortByObject = {
        sort: split[0],
        reverse: split[1] === 'reverse' ? true : false,
    };
    setSortBy(sortObj);
};
