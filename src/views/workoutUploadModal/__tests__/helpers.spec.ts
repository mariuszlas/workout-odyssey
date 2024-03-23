import { beforeAll, describe, expect, it, vi } from 'vitest';

import { UploadWorkout, Workout } from '@/interfaces';

import { _t } from '../..';
import { formatPreviewItem, formatPreviewMessage } from '../helpers';

describe('formatPreviewMessage', () => {
    const workout = {
        type: 'running',
        timestamp: '2023-03-08T12:00:00Z',
        utcOffset: 1,
    } as unknown as UploadWorkout;

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

    it('should return the correct message if there are no existing data records', () => {
        const existingData: Workout[] = [];
        const actual = formatPreviewMessage(existingData, workout);

        expect(actual).toEqual(
            'There are no records for running on 08/03/2023, 13:00'
        );
    });

    it('should return the correct message if there is one existing data record', () => {
        const existingData = [{ type: 'running' }] as unknown as Workout[];
        const actual = formatPreviewMessage(existingData, workout);

        expect(actual).toEqual(
            'There is 1 record for running on 08/03/2023, 13:00'
        );
    });

    it('should return the correct message if there are multiple existing data records', () => {
        const existingData = [
            { type: 'running' },
            { type: 'running' },
        ] as unknown as Workout[];
        const actual = formatPreviewMessage(existingData, workout);

        expect(actual).toEqual(
            'There are 2 records for running on 08/03/2023, 13:00'
        );
    });
});

describe('formatPreviewItem', () => {
    it('should return the correct message with distance and duration', () => {
        const workout = {
            distance: 10,
            duration: 60,
        } as unknown as Workout;
        const actual = formatPreviewItem(workout);

        expect(actual).toEqual('Distance: 10.0 km, Duration: 00:01:00');
    });
});
