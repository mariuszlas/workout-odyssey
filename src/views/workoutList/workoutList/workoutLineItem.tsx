import type { FC } from 'react';

import { Label } from '@/components';
import { Units, Workout, WorkoutTypes } from '@/interfaces';

import {
    DateEntry,
    Distance,
    Duration,
    PaceOrSpeed,
} from '../../workoutLineItem';
import { WorkoutMenu } from '../../workoutMenu';

export interface Props {
    data: Workout;
    type: WorkoutTypes;
    units: Units;
}

export const WorkoutLineItem: FC<Props> = ({ ...props }) => (
    <li className="w-full">
        <div className="gap2 flex justify-between py-2 sm:px-4 sm:py-1.5">
            <div>
                <div className="flex gap-4 font-medium">
                    <Distance {...props} />

                    {props.data.label && (
                        <Label label={props.data.label} small />
                    )}
                </div>

                <div className="flex gap-2 sm:gap-4">
                    <Duration {...props} />
                    <PaceOrSpeed {...props} />
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-4">
                <DateEntry {...props} />
                <WorkoutMenu {...props} />
            </div>
        </div>

        <hr className="border-t border-t-primary" />
    </li>
);
