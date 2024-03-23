import type { FC } from 'react';

import { _t, FormLabel, Input } from '@/components';
import { useIsBreakpoint } from '@/hooks';

import { NewWorkoutProps } from '../intrefaces';

export const DistanceInput: FC<NewWorkoutProps> = ({ workout, setWorkout }) => {
    const isMobile = useIsBreakpoint('sm');

    return (
        <div className="w-fit">
            <FormLabel
                text={isMobile ? _t.distanceKmShort : _t.distanceKm}
                htmlFor="distance"
            />
            <Input
                id="distance"
                className="w-20 sm:w-24"
                value={workout.distance}
                type="number"
                onChange={e =>
                    setWorkout(prev => ({
                        ...prev,
                        distance: Number(e.target.value),
                    }))
                }
            />
        </div>
    );
};
