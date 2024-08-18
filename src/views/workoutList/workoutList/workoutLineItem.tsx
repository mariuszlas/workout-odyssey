import type { FC } from 'react';

import {
    Badge,
    DateEntry,
    Distance,
    Duration,
    Pace,
    Separator,
    Speed,
} from '@/components';
import { Units, Workout, WorkoutTypes } from '@/interfaces';

import { WorkoutMenu } from './workoutMenu';

export interface Props {
    data: Workout;
    units: Units;
}

export const WorkoutLineItem: FC<Props> = ({ data, units }) => (
    <li className="w-full">
        <div className="flex justify-between gap-2 py-2 sm:py-1.5 sm:pl-4">
            <div className="overflow-hidden">
                <div className="flex flex-wrap gap-x-4 font-medium">
                    <Distance value={data.distance} units={units} />
                    {data.label && <Badge label={data.label} />}
                </div>
                <div className="flex flex-wrap gap-x-4 sm:gap-x-6">
                    <Duration value={data.duration} />
                    {data.type === WorkoutTypes.CYCLING ? (
                        <Speed value={data.speed} units={units} />
                    ) : (
                        <Pace value={data.pace} units={units} />
                    )}
                </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
                <DateEntry timestamp={data.timestamp} tz={data.timezone} />
                <WorkoutMenu data={data} />
            </div>
        </div>
        <Separator />
    </li>
);
