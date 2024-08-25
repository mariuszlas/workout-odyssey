import { describe, expect, it } from 'vitest';

import { TLabel } from '@/interfaces';

import { LABEL_COLORS } from './constants';
import { formatNewLabelValue, getNewLabel, zeroPad } from './helpers';

describe('zeroPad', () => {
    it('should return the number padded with a 0 if it is less than 10', () => {
        const num = 3;
        const str = '3';

        const actualNum = zeroPad(num);
        const actualStr = zeroPad(str);

        expect(actualNum).toEqual('03');
        expect(actualStr).toEqual('03');
    });

    it('should return the number as is if it is greater than or equal to 10', () => {
        const num1 = 10;
        const num2 = 12;
        const str1 = '10';
        const str2 = '12';

        const actualNum1 = zeroPad(num1);
        const actualNum2 = zeroPad(num2);
        const actualStr1 = zeroPad(str1);
        const actualStr2 = zeroPad(str2);

        expect(actualNum1).toEqual('10');
        expect(actualNum2).toEqual('12');
        expect(actualStr1).toEqual('10');
        expect(actualStr2).toEqual('12');
    });
});

describe('formatNewLabelValue', () => {
    it('should remove leading and trailing whitespaces from the newLabelValue', () => {
        const newLabelValue = '   some value   ';
        const actual = formatNewLabelValue(newLabelValue);

        expect(actual).toEqual('some value');
    });

    it('should return the newLabelValue as is if it does not contain any whitespaces', () => {
        const newLabelValue = 'somevalue';
        const actual = formatNewLabelValue(newLabelValue);

        expect(actual).toEqual(newLabelValue);
    });
});

describe('getNewLabel', () => {
    const allLabels: TLabel[] = [];
    const newLabels: TLabel[] = [];

    it('should return a new label with a random color', () => {
        const newLabelValue = 'New Label';
        const actual = getNewLabel(allLabels, newLabels, newLabelValue);

        expect(actual.value).toBe(newLabelValue);
        expect(actual.background).not.toHaveLength(0);
    });

    it('should reuse a color if all available colors are taken', () => {
        const allLabels = LABEL_COLORS.map(
            ({ background, foreground }, idx) => ({
                value: `label ${idx}`,
                foreground,
                background,
            })
        );

        const newLabels: TLabel[] = [];
        const newLabelValue = 'New Label';

        const newLabel = getNewLabel(allLabels, newLabels, newLabelValue);

        expect(LABEL_COLORS.map(({ background }) => background)).toContain(
            newLabel.background
        );
    });
});
