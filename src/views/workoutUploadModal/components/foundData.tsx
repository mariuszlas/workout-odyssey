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
    const isNotPlural = foundData.length === 1;

    return (
        <>
            <Separator />
            <Alert variant="warning">
                <AlertDescription>
                    There {isNotPlural ? 'is' : 'are'} {foundData.length}{' '}
                    {isNotPlural ? 'record' : 'records'} for {data.type} on{' '}
                    {getDateTimeTZ(data.timestamp, data.timezone, true)}
                </AlertDescription>
            </Alert>
            <TextP className="font-medium">
                Existing Workout{isNotPlural ? '' : 's'}
            </TextP>
            <ul className="rounded-lg border">
                {foundData.map((workout, idx) => (
                    <li
                        key={idx}
                        className="flex flex-wrap gap-x-4 border-t px-4 py-2 first:border-t-0 sm:gap-x-6"
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
