import { describe, expect, it } from 'vitest';

import { _t, labelColors } from '@/constants';
import { TLabel } from '@/interfaces';

import {
    formatNewLabelValue,
    getHours,
    getMinues,
    getNewLabel,
    getSeconds,
    validateNewLabel,
    zeroPad,
    zeroPadDuration,
} from './helpers';

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

describe('zeroPadDuration', () => {
    it('should return the correct duration with zero padding', () => {
        const duration = 4201;
        const actual = zeroPadDuration(duration);

        expect(actual).toEqual('01:10:01');
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

describe('validateNewLabel', () => {
    it('should throw an error if the label value is empty', () => {
        const newLabelValue = '';

        expect(() => validateNewLabel([], [], newLabelValue)).toThrow(
            _t.errorLabelInputLength
        );
    });

    it('should throw an error if the label value is too long', () => {
        const newLabelValue =
            'This is a very long label value that is longer than 25 characters.';

        expect(() => validateNewLabel([], [], newLabelValue)).toThrow(
            _t.errorLabelInputLength
        );
    });

    it('should throw an error if the label value contains the semicolon character', () => {
        const newLabelValue = 'This;is;a;label';

        expect(() => validateNewLabel([], [], newLabelValue)).toThrow(
            _t.errorLabelInputBadChar
        );
    });

    it('should throw an error if the label value already exists', () => {
        const newLabelValue = 'New Label';
        const existingLabel = {
            value: newLabelValue,
        } as unknown as TLabel;

        expect(() =>
            validateNewLabel([existingLabel], [], newLabelValue)
        ).toThrow(_t.errorLabelDuplicate);
    });

    it('should not throw an error if the label value is valid', () => {
        const newLabelValue = 'Valid Label';

        expect(() => validateNewLabel([], [], newLabelValue)).not.toThrow();
    });
});

describe('getNewLabel', () => {
    const allLabels: TLabel[] = [];
    const newLabels: TLabel[] = [];

    it('should return a new label with a random color', () => {
        const newLabelValue = 'New Label';
        const actual = getNewLabel(allLabels, newLabels, newLabelValue);

        expect(actual.value).toBe(newLabelValue);
        expect(actual.color).not.toHaveLength(0);
    });

    it('should reuse a color if all available colors are taken', () => {
        const allLabels = [
            { value: 'Label 1', color: labelColors[0] },
            { value: 'Label 2', color: labelColors[1] },
            { value: 'Label 3', color: labelColors[2] },
            { value: 'Label 4', color: labelColors[3] },
            { value: 'Label 5', color: labelColors[4] },
            { value: 'Label 6', color: labelColors[5] },
            { value: 'Label 7', color: labelColors[6] },
            { value: 'Label 8', color: labelColors[7] },
        ];

        const newLabels: TLabel[] = [];
        const newLabelValue = 'New Label';

        const newLabel = getNewLabel(allLabels, newLabels, newLabelValue);

        expect(labelColors).toContain(newLabel.color);
    });
});

describe('getHours', () => {
    it('should return a correct number of hours from duration in seconds', () => {
        expect(getHours(7482)).toBe(2);
    });
});

describe('getMinues', () => {
    it('should return a correct number of hours from duration in seconds', () => {
        expect(getMinues(7482)).toBe(4);
    });
});

describe('getSeconds', () => {
    it('should return a correct number of hours from duration in seconds', () => {
        expect(getSeconds(7482)).toBe(42);
    });
});
