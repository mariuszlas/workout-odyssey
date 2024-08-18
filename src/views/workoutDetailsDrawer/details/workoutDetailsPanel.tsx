import type { FC } from 'react';

import type { Workout } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';
import { useUI } from '@/providers';
import { formatDuration, formatPace, getDateTimeTZ } from '@/utils/helpers';

import { LineItem } from './workoutDetailsLineItem';

export const WorkoutDetailsPanel: FC<{ data: Workout }> = ({ data }) => {
    const { units } = useUI();

    return (
        <ul className="border-base-content rounded-lg border border-opacity-20">
            <LineItem title="Activity" value={data.type} label={data.label} />
            <LineItem
                title="Distance"
                value={`${data.distance.toFixed(1)} ${units.km}`}
            />
            <LineItem
                title="Start Time"
                value={getDateTimeTZ(
                    data.timestamp,
                    data.timezone,
                    data.dateOnly
                )}
            />
            <LineItem
                title="Total Duration"
                value={formatDuration(data.duration)}
            />
            {data.type === WorkoutTypes.CYCLING ? (
                <LineItem
                    title="Average Speed"
                    value={`${data.speed.toFixed(1)} ${units.kmh}`}
                />
            ) : (
                <LineItem
                    title="Average Pace"
                    value={`${formatPace(data.pace)} /${units.km}`}
                />
            )}
            {data.notes && <LineItem title="Notes" value={data.notes} notes />}
        </ul>
    );
};
