'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Alert, DateEntry, Distance, Duration, Text } from '@/components';
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
            <hr className="border-t border-t-base-content border-opacity-20" />
            <Alert
                status={'warning'}
                classes="m-0 p-2"
                content={t('WorkoutUpload.Preview.alertDetails', {
                    count: foundData.length,
                    type: t('workoutType', {
                        workoutType: data.type,
                    }),
                    date: getDateTimeTZ(data.timestamp, data.timezone, true),
                })}
            />
            <Text
                className="font-medium"
                value={t('WorkoutUpload.Preview.foundDataHeader')}
            />

            <ul className="rounded-lg border border-base-content border-opacity-20">
                {foundData.map((workout, idx) => (
                    <li
                        key={idx}
                        className={clsx(
                            'flex gap-6 overflow-hidden overflow-ellipsis px-4 py-2',
                            {
                                'border-t border-t-base-content border-opacity-20':
                                    idx !== 0,
                            }
                        )}
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
