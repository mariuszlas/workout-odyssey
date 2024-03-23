import { ChangeEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { handleSort } from './helpers';

describe('handleSort', () => {
    it('should set the sort to the selected value', () => {
        const e = {
            target: { value: 'name-reverse' },
            preventDefault: vi.fn(),
        } as unknown as ChangeEvent<HTMLSelectElement>;
        const setSortBy = vi.fn();

        handleSort(e, setSortBy);

        expect(setSortBy).toBeCalledWith({
            sort: 'name',
            reverse: true,
        });
    });

    it("should set the reverse to false if the value does not contain 'reverse'", () => {
        const e = {
            target: { value: 'name' },
            preventDefault: vi.fn(),
        } as unknown as ChangeEvent<HTMLSelectElement>;
        const setSortBy = vi.fn();

        handleSort(e, setSortBy);

        expect(setSortBy).toBeCalledWith({
            sort: 'name',
            reverse: false,
        });
    });
});
