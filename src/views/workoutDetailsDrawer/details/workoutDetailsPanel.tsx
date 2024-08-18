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
        <ul className="border-base-content rounded-lg border border-opacity-20">
            <LineItem
                title={t('WorkoutDetails.activity')}
                value={t('workoutType', { workoutType: data.type })}
                label={data.label}
            />
            <LineItem
                title={t('WorkoutDetails.distance')}
                value={`${data.distance.toFixed(1)} ${units.km}`}
            />
            <LineItem
                title={t('WorkoutDetails.date')}
                value={getDateTimeTZ(
                    data.timestamp,
                    data.timezone,
                    data.dateOnly
                )}
            />
            <LineItem
                title={t('WorkoutDetails.duration')}
                value={formatDuration(data.duration)}
            />
            {data.type === WorkoutTypes.CYCLING ? (
                <LineItem
                    title={t('WorkoutDetails.speed')}
                    value={`${data.speed.toFixed(1)} ${units.kmh}`}
                />
            ) : (
                <LineItem
                    title={t('WorkoutDetails.pace')}
                    value={`${formatPace(data.pace)} /${units.km}`}
                />
            )}
            {data.notes && (
                <LineItem
                    title={t('WorkoutDetails.notes')}
                    value={data.notes}
                    notes
                />
            )}
        </ul>
    );
};
