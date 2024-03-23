import type { FC } from 'react';

import { _t } from '@/components';
import type { Workout } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';
import { getDateTimeTZ, getDuration, getPace } from '@/views/helpers';

import { LineItem } from './workoutDetailsLineItem';

interface Props {
    data: Workout;
}

export const WorkoutDetailsPanel: FC<Props> = ({ data }) => (
    <ul className="flex flex-col items-stretch gap-2 p-0 sm:px-4">
        <LineItem type={_t.activity} value={data.type} label={data.label} />
        <LineItem
            type={_t.distance}
            value={`${data.distance.toFixed(1)} ${_t.km}`}
        />
        <LineItem
            type={_t.date}
            value={getDateTimeTZ(data.timestamp, data.utcOffset)}
        />
        <LineItem type={_t.duration} value={getDuration(data.duration)} />

        {data.type === WorkoutTypes.CYCLING ? (
            <LineItem
                type={_t.speed}
                value={`${data.speed.toFixed(1)} ${_t.kmPerHour}`}
            />
        ) : (
            <LineItem
                type={_t.pace}
                value={`${getPace(data.pace)} ${_t.perKm}`}
            />
        )}

        {data.notes && <LineItem type={_t.notes} value={data.notes} notes />}
    </ul>
);
