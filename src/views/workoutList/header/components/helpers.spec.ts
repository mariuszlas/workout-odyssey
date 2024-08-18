import { describe, expect, it, vi } from 'vitest';

import { handleSort } from './helpers';
import { SortOptions } from './sorting';

describe('handleSort', () => {
    it('should set the sort to the selected value', () => {
        const setSortBy = vi.fn();
        handleSort(SortOptions.DATE_REVERSE, setSortBy);

        expect(setSortBy).toBeCalledWith({
            sort: 'date',
            reverse: true,
        });
    });

    it("should set the reverse to false if the value does not contain 'reverse'", () => {
        const setSortBy = vi.fn();
        handleSort(SortOptions.PACE, setSortBy);

        expect(setSortBy).toBeCalledWith({
            sort: 'pace',
            reverse: false,
        });
    });
});
