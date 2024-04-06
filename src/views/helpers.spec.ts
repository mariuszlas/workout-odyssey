import { beforeAll, describe, expect, it, test, vi } from 'vitest';

import {
    capitalize,
    formatDuration,
    formatPace,
    getDateTimeTZ,
    getFormattedMonthAndYear,
    getMonth,
} from './helpers';

describe('getMonth', () => {
    it('should return the short month name if isShort is true', () => {
        const expectedMonth = 'Jan';
        const actualMonth = getMonth(0, true);

        expect(actualMonth).toBe(expectedMonth);
    });

    it('should return the long month name if isShort is false', () => {
        const expectedMonth = 'January';

        const actualMonth = getMonth(0, false);
        expect(actualMonth).toBe(expectedMonth);

        const actualMonthDefault = getMonth(0);
        expect(actualMonthDefault).toBe(expectedMonth);
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
        'should return correctly formatted date string %s for timestamp %s and timezone %s',
        (expected, timestamp, timezone) => {
            expect(
                getDateTimeTZ(timestamp as string, timezone as string, false)
            ).toBe(expected);
        }
    );
});

describe('getFormattedMonthAndYear', () => {
    const year = 2023;
    const month = 1;

    it('should return the formatted month and year if isShortMonth is true', () => {
        const expectedMonthAndYear = 'Jan 2023';
        const actualMonthAndYear = getFormattedMonthAndYear(year, month, true);
        expect(actualMonthAndYear).toBe(expectedMonthAndYear);
    });

    it('should return the formatted month and year if isShortMonth is false', () => {
        const expectedMonthAndYear = 'January 2023';
        const actualMonthAndYear = getFormattedMonthAndYear(year, month, false);
        expect(actualMonthAndYear).toBe(expectedMonthAndYear);
    });
});
