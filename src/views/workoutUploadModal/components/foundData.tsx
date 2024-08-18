'use client';

import { type FC } from 'react';

import {
    Alert,
    AlertDescription,
    DateEntry,
    Distance,
    Duration,
    Separator,
    TextP,
} from '@/components';
import type { UploadWorkout, Workout } from '@/interfaces';
import { useUI } from '@/providers';
import { getDateTimeTZ } from '@/utils/helpers';

interface Props {
    data: UploadWorkout;
    foundData: Workout[];
}

export const FoundData: FC<Props> = ({ data, foundData }) => {
    const { units } = useUI();

    return (
        <>
            <Separator />
            <Alert variant="warning">
                <AlertDescription>
                    There{' '}
                    {foundData.length === 0
                        ? 'are no'
                        : foundData.length > 1
                          ? 'are'
                          : 'is'}{' '}
                    {foundData.length === 0 ? '' : foundData.length}{' '}
                    {foundData.length > 1 ? 'records' : 'record'} for{' '}
                    {data.type} on{' '}
                    {getDateTimeTZ(data.timestamp, data.timezone, true)}
                </AlertDescription>
            </Alert>
            <TextP className="font-medium">Existing Data</TextP>
            <ul className="border-base-content rounded-lg border border-opacity-20">
                {foundData.map((workout, idx) => (
                    <li
                        key={idx}
                        className="border-t-base-content flex flex-wrap gap-x-4 overflow-hidden overflow-ellipsis border-t border-opacity-20 px-4 py-2 first:border-t-0 sm:gap-x-6"
                    >
                        <DateEntry
                            timestamp={data.timestamp}
                            tz={data.timezone}
                            dateOnly={false}
                        />
                        <Distance value={workout.distance} units={units} icon />
                        <Duration value={workout.duration} />
                    </li>
                ))}
            </ul>
        </>
    );
};
