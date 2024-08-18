import { beforeAll, describe, expect, it, test, vi } from 'vitest';

import {
    capitalize,
    cn,
    formatDuration,
    formatPace,
    getDateTimeTZ,
    getFormattedMonthAndYear,
} from './helpers';

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

describe('capitalize', () => {
    test.each([
        ['hello', 'Hello'],
        ['world', 'World'],
        ['123', '123'],
        ['!@#', '!@#'],
        [undefined, undefined],
    ])('capitalizes %s to %s', (input, expected) => {
        expect(capitalize(input)).toBe(expected);
    });
});

describe('formatDuration', () => {
    it('should return correctly formatted duration time', () => {
        expect(formatDuration(0)).toBe('00:00:00');
        expect(formatDuration(7)).toBe('00:00:07');
        expect(formatDuration(60)).toBe('00:01:00');
        expect(formatDuration(61)).toBe('00:01:01');
        expect(formatDuration(3600)).toBe('01:00:00');
        expect(formatDuration(3661)).toBe('01:01:01');
    });
});

describe('formatPace', () => {
    it('should correctly format pace from given seconds', () => {
        expect(formatPace(0)).toBe('00\'00"');
        expect(formatPace(30)).toBe('00\'30"');
        expect(formatPace(60)).toBe('01\'00"');
        expect(formatPace(623)).toBe('10\'23"');
    });
});

describe('getDateTimeTZ', () => {
    const timezone = 'Europe/London';

    beforeAll(() => {
        const origDate = global.Date.prototype.toLocaleDateString;
        vi.spyOn(
            global.Date.prototype,
            'toLocaleDateString'
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).mockImplementation(function (this: any) {
            return origDate.call(this, 'en-GB');
        });
    });

    it('should return empty string if timestamp is undefined', () => {
        const timestamp = undefined;
        const expectedDateTime = '';
        const actualDateTime = getDateTimeTZ(timestamp, timezone);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    it('should return formatted date', () => {
        const timestamp = '2023-12-01T00:00:00Z';
        const expectedDateTime = '01/12/2023';
        const actualDateTime = getDateTimeTZ(timestamp, timezone);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    it('should return formatted date if timestamp without time was provided', () => {
        const timestamp = '2023-12-01';
        const expectedDateTime = '01/12/2023';
        const actualDateTime = getDateTimeTZ(timestamp, timezone);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    it('should return formatted date and time', () => {
        const timestamp = '2023-12-01T08:30:10';
        const expectedDateTime = '01/12/2023, 08:30';
        const actualDateTime = getDateTimeTZ(timestamp, timezone, false);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    const cases = [
        ['11/01/2023, 09:00', '2023-01-11T14:00:00Z', 'America/New_York'],
        ['31/01/2023, 20:30', '2023-02-01T01:30:00Z', 'America/Havana'],
        ['01/12/2023, 08:00', '2023-12-01T07:00:00Z', 'Europe/Warsaw'],
        ['30/06/2023, 22:30', '2023-06-30T20:30:00Z', 'Europe/Warsaw'],
        ['01/01/2024, 08:45', '2023-12-31T21:45:00Z', 'Australia/Sydney'],
    ];

    test.each(cases)(
        'should return correctly formatted date string for timestamp and timezone',
        (expected, timestamp, timezone) => {
            expect(
                getDateTimeTZ(timestamp as string, timezone as string, false)
            ).toBe(expected);
        }
    );
});

describe('getFormattedMonthAndYear', () => {
    const cases = [
        ['Jan 2024', 2024, 1, 'en', true],
        ['January 2024', 2024, 1, 'en', false],
        ['sty 2024', 2024, 1, 'pl', true],
        ['styczeń 2024', 2024, 1, 'pl', false],
    ];

    test.each(cases)(
        'should return correctly formatted month and year',
        (expected, year, month, locale, isShortMonth) => {
            expect(
                getFormattedMonthAndYear(year as number, month as number, {
                    locale: locale as string,
                    isShortMonth: isShortMonth as boolean,
                })
            ).toBe(expected);
        }
    );
});
