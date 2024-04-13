import { describe, expect, it } from 'vitest';

import { formatDurationAsDecimal, getStatsPanelHeading } from './helpers';

describe('getStatsPanelHeading', () => {
    const locale = 'en';
    const translations = { yearT: 'Year', totalT: 'Total' };

    it('returns correct header for primary stats panel for 0', () => {
        const isPrimary = true;
        const headerData = { year: 0, secStats: 2022 };
        expect(
            getStatsPanelHeading(isPrimary, headerData, locale, translations)
        ).toBe('Total');
    });

    it('returns correct header for primary stats panel for a given year', () => {
        const isPrimary = true;
        const headerData = { year: 2022, secStats: 3 };
        expect(
            getStatsPanelHeading(isPrimary, headerData, locale, translations)
        ).toBe('Year 2022');
    });

    it('returns correct header for secondary stats panel if secondary view is a month', () => {
        const isPrimary = false;
        const headerData = { year: 2022, secStats: 5 };
        expect(
            getStatsPanelHeading(isPrimary, headerData, locale, translations)
        ).toBe('May 2022');
    });

    it('returns correct header for secondary stats panel if secondary view is a year', () => {
        const isPrimary = false;
        const headerData = { year: 0, secStats: 2022 };
        expect(
            getStatsPanelHeading(isPrimary, headerData, locale, translations)
        ).toBe('Year 2022');
    });
});

describe('formatDurationAsDecimal', () => {
    it('should return hours if duration is greater than or to an hour', () => {
        expect(formatDurationAsDecimal(4260)).toBe('1.2');
    });

    it('should return minutes if duration is less than an hour', () => {
        expect(formatDurationAsDecimal(1800)).toBe('30');
    });
});
