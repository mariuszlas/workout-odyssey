import type { FC } from 'react';
import { useTranslations } from 'next-intl';

import { FormLabel, Select } from '@/components';

import { WorkoutForm } from '../intrefaces';

export const TimezoneSelector: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.timezone');

    return (
        <div className="w-fit">
            <FormLabel text={t('label')} htmlFor="timezone" />
            <Select
                id="timezone"
                value={workout.timezone}
                className="max-w-44"
                onChange={e => {
                    setWorkouts(prev =>
                        prev.map(wk =>
                            wk.id === workout.id
                                ? { ...wk, timezone: e.target.value }
                                : wk
                        )
                    );
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
