import { describe, expect, it } from 'vitest';

import { getDecimal, getStatsPanelHeading } from './helpers';

describe('getStatsPanelHeading', () => {
    it('returns correct header for primary stats panel for 0', () => {
        const isPrimary = true;
        const state = { year: 0, secStats: 2022 };
        expect(getStatsPanelHeading(isPrimary, state)).toBe('Total');
    });

    it('returns correct header for primary stats panel for a given year', () => {
        const isPrimary = true;
        const state = { year: 2022, secStats: 3 };
        expect(getStatsPanelHeading(isPrimary, state)).toBe('Year 2022');
    });

    it('returns correct header for secondary stats panel if secondary view is a month', () => {
        const isPrimary = false;
        const state = { year: 2022, secStats: 5 };
        expect(getStatsPanelHeading(isPrimary, state)).toBe('May 2022');
    });

    it('returns correct header for secondary stats panel if secondary view is a year', () => {
        const isPrimary = false;
        const state = { year: 0, secStats: 2022 };
        expect(getStatsPanelHeading(isPrimary, state)).toBe('Year 2022');
    });
});

describe('getDecimal', () => {
    it('should return undefined if no seconds provided', () => {
        expect(getDecimal(undefined)).toBeUndefined();
        expect(getDecimal(0)).toBeUndefined();
        expect(getDecimal(-3600)).toBeUndefined();
    });

    it('should return formatted time and unit', () => {
        expect(getDecimal(60)).toStrictEqual({ time: '1', unit: 'min' });
        expect(getDecimal(121)).toStrictEqual({ time: '2', unit: 'min' });
        expect(getDecimal(1800)).toEqual({ time: '30', unit: 'min' });
        expect(getDecimal(3600)).toStrictEqual({ time: '1.0', unit: 'h' });
        expect(getDecimal(5400)).toStrictEqual({ time: '1.5', unit: 'h' });
    });
});
