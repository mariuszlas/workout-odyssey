import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import type { Workout } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';
import { useUI } from '@/providers';
import { formatDuration, formatPace, getDateTimeTZ } from '@/utils/helpers';

import { LineItem } from './workoutDetailsLineItem';

export const WorkoutDetailsPanel: FC<{ data: Workout }> = ({ data }) => {
    const { units } = useUI();
    const t = useTranslations('Dashboard');

    return (
        <ul className="flex flex-col items-stretch gap-2 p-0 sm:px-4">
            <LineItem
                type={t('WorkoutDetails.activity')}
                value={t('workoutType', { workoutType: data.type })}
                label={data.label}
            />
            <LineItem
                type={t('WorkoutDetails.distance')}
                value={`${data.distance.toFixed(1)} ${units.km}`}
            />
            <LineItem
                type={t('WorkoutDetails.date')}
                value={getDateTimeTZ(
                    data.timestamp,
                    data.timezone,
                    data.dateOnly
                )}
            />
            <LineItem
                type={t('WorkoutDetails.duration')}
                value={formatDuration(data.duration)}
            />

            {data.type === WorkoutTypes.CYCLING ? (
                <LineItem
                    type={t('WorkoutDetails.speed')}
                    value={`${data.speed.toFixed(1)} ${units.kmh}`}
                />
            ) : (
                <LineItem
                    type={t('WorkoutDetails.pace')}
                    value={`${formatPace(data.pace)} /${units.km}`}
                />
            )}

            {data.notes && (
                <LineItem
                    type={t('WorkoutDetails.notes')}
                    value={data.notes}
                    notes
                />
            )}
        </ul>
    );
};
