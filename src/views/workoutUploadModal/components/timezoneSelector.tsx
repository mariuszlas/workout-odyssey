import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { FormLabel, Select } from '@/components';

import { NewWorkoutProps } from '../intrefaces';

export const TimezoneSelector: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.timezone');

    return (
        <div className="w-fit">
            <FormLabel text={t('label')} htmlFor="timezone" />
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
};
