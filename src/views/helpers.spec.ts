import { beforeAll, describe, expect, it, test, vi } from 'vitest';

import {
    capitalize,
    getDateTimeTZ,
    getDuration,
    getFormattedMonthAndYear,
    getHMS,
    getMonth,
    getPace,
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

describe('getHMS', () => {
    it('should calculate number of hours, minutes and seconds', () => {
        expect(getHMS(60)).toStrictEqual({ s: 0, m: 1, h: 0 });
        expect(getHMS(61)).toStrictEqual({ s: 1, m: 1, h: 0 });
        expect(getHMS(120)).toStrictEqual({ s: 0, m: 2, h: 0 });
        expect(getHMS(3600)).toStrictEqual({ s: 0, m: 0, h: 1 });
        expect(getHMS(3601)).toStrictEqual({ s: 1, m: 0, h: 1 });
    });
});

describe('getDuration', () => {
    it('should return correctly formatted duration time', () => {
        expect(getDuration(0)).toBe('00:00:00');
        expect(getDuration(7)).toBe('00:00:07');
        expect(getDuration(60)).toBe('00:01:00');
        expect(getDuration(61)).toBe('00:01:01');
        expect(getDuration(3600)).toBe('01:00:00');
        expect(getDuration(3661)).toBe('01:01:01');
    });
});

describe('getPace', () => {
    it('should return undefined if no seconds provided', () => {
        expect(getPace(undefined)).toBeUndefined();
    });

    it('should correctly format pace from given seconds', () => {
        expect(getPace(30)).toBe('00\'30"');
        expect(getPace(60)).toBe('01\'00"');
        expect(getPace(623)).toBe('10\'23"');
    });

    it('should calculate pace and format pace when distance is given', () => {
        expect(getPace(600, 10)).toBe('01\'00"');
        expect(getPace(6230, 10)).toBe('10\'23"');
    });
});

describe('getDateTimeTZ', () => {
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

    it('should return undefined if timestamp is undefined', () => {
        const timestamp = undefined;
        const expectedDateTime = undefined;
        const actualDateTime = getDateTimeTZ(timestamp);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    it('should return formatted date if utcOffset is not provided and time is zero', () => {
        const timestamp = '2023-12-01T00:00:00Z';
        const expectedDateTime = '01/12/2023';
        const actualDateTime = getDateTimeTZ(timestamp);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    it('should return formatted date if timestamp without time was provided', () => {
        const timestamp = '2023-12-01';
        const expectedDateTime = '01/12/2023';
        const actualDateTime = getDateTimeTZ(timestamp);
        expect(actualDateTime).toBe(expectedDateTime);
    });

    const cases = [
        ['11/01/2023, 09:00', '2023-01-11T14:00:00Z', -5],
        ['31/01/2023, 19:30', '2023-02-01T01:30:00Z', -6],
        ['31/12/2022, 18:45', '2023-01-01T02:45:00Z', -8],
        ['01/12/2023, 09:00', '2023-12-01T07:00:00Z', 2],
        ['01/12/2023, 02:30', '2023-11-30T22:30:00Z', 4],
        ['01/01/2024, 05:45', '2023-12-31T21:45:00Z', 8],
    ];

    test.each(cases)(
        'should return correctly formatted date string %s for timestamp %s and UTC offset %s',
        (expected, timestamp, utcOffset) => {
            expect(
                getDateTimeTZ(timestamp as string, utcOffset as number)
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
