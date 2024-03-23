import { describe, expect, it } from 'vitest';

import { cn } from './helpers';

describe('cn', () => {
    it('merges class names correctly', () => {
        const expectedClassName =
            'bg-blue-500 hover:bg-blue-700 font-bold text-white';
        const actualClassName = cn(
            'bg-blue-500',
            'hover:bg-blue-700',
            'font-bold text-white'
        );
        expect(actualClassName).toBe(expectedClassName);
    });
});
