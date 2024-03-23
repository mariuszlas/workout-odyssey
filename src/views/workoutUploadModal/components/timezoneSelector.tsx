import type { FC } from 'react';

import { _t, FormLabel, Select } from '@/components';

import { NewWorkoutProps } from '../intrefaces';

const timezones = [
    { name: 'UTC+00:00', value: 0 },
    { name: 'UTC+01:00', value: 1 },
    { name: 'UTC+02:00', value: 2 },
    { name: 'UTC+03:00', value: 3 },
    { name: 'UTC+04:00', value: 4 },
    { name: 'UTC+05:00', value: 5 },
    { name: 'UTC+06:00', value: 6 },
    { name: 'UTC+07:00', value: 7 },
    { name: 'UTC+08:00', value: 8 },
    { name: 'UTC+09:00', value: 9 },
    { name: 'UTC+10:00', value: 10 },
    { name: 'UTC+11:00', value: 11 },
    { name: 'UTC+12:00', value: 12 },
    { name: 'UTC-01:00', value: -1 },
    { name: 'UTC-02:00', value: -2 },
    { name: 'UTC-03:00', value: -3 },
    { name: 'UTC-04:00', value: -4 },
    { name: 'UTC-05:00', value: -5 },
    { name: 'UTC-06:00', value: -6 },
    { name: 'UTC-07:00', value: -7 },
    { name: 'UTC-08:00', value: -8 },
    { name: 'UTC-09:00', value: -9 },
    { name: 'UTC-10:00', value: -10 },
    { name: 'UTC-12:00', value: -11 },
    { name: 'UTC-12:00', value: -12 },
];

export const TimezoneSelector: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => (
    <div className="w-fit">
        <FormLabel text={_t.labelTimezone} htmlFor="timezone" />
        <Select
            id="timezone"
            value={workout.utcOffset}
            onChange={e =>
                setWorkout(prev => ({
                    ...prev,
                    utcOffset: Number(e.target.value),
                }))
            }
        >
            {timezones.map(({ name, value }) => (
                <option key={value} value={value}>
                    {name}
                </option>
            ))}
        </Select>
    </div>
);
