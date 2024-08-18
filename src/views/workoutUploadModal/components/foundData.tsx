'use client';

import { type FC } from 'react';
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('Dashboard');

    return (
        <>
            <Separator />
            <Alert variant="warning">
                <AlertDescription>
                    {t('WorkoutUpload.Preview.alertDetails', {
                        count: foundData.length,
                        type: t('workoutType', {
                            workoutType: data.type,
                        }),
                        date: getDateTimeTZ(
                            data.timestamp,
                            data.timezone,
                            true
                        ),
                    })}
                </AlertDescription>
            </Alert>
            <TextP
                className="font-medium"
                value={t('WorkoutUpload.Preview.foundDataHeader')}
            />
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
