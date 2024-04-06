import type { FC } from 'react';

import { _t, FormLabel, Select } from '@/components';

import { NewWorkoutProps } from '../intrefaces';

export const TimezoneSelector: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => (
    <div className="w-fit">
        <FormLabel text={_t.labelTimezone} htmlFor="timezone" />
        <Select
            id="timezone"
            value={workout.timezone}
            className="max-w-44"
            onChange={e => {
                setWorkout(prev => ({ ...prev, timezone: e.target.value }));
            }}
        >
            {Intl.supportedValuesOf('timeZone').map((value, idx) => (
                <option key={idx} value={value}>
                    {value}
                </option>
            ))}
        </Select>
    </div>
);
