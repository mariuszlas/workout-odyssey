'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import {
    DateEntry,
    Distance,
    Duration,
    IconButton,
    Label,
    Text,
    TrashIcon,
} from '@/components';
import type { UploadWorkout, Workout } from '@/interfaces';
import { useUI } from '@/providers';

import { FoundData } from './foundData';

interface Props {
    data: UploadWorkout;
    foundData: Workout[];
    isEdit: boolean;
    removeItem: () => void;
}

export const PreviewListItem: FC<Props> = ({
    data,
    isEdit,
    foundData,
    removeItem,
}) => {
    const { units } = useUI();
    const t = useTranslations('Dashboard');

    const existingData = isEdit
        ? foundData.filter(workout => workout.id !== data.id)
        : foundData;

    return (
        <li
            className={clsx(
                'flex w-full flex-col gap-4 rounded-lg border border-opacity-20 px-4 py-2',
                existingData.length > 0
                    ? 'border-2 border-warning'
                    : 'border-base-content'
            )}
        >
            <div className="flex justify-between gap-4">
                <div className="overflow-hidden overflow-ellipsis">
                    <div className="flex items-center gap-4">
                        <Text className="font-medium capitalize">
                            {t('workoutType', {
                                workoutType: data.type,
                            })}
                        </Text>
                        {data?.label && <Label label={data.label} small />}
                    </div>

                    <div className="flex flex-wrap gap-x-4 sm:gap-x-6">
                        <DateEntry
                            timestamp={data.timestamp}
                            tz={data.timezone}
                            dateOnly={false}
                        />
                        <Distance value={data.distance} units={units} icon />
                        <Duration value={data.duration} />
                    </div>
                </div>

                <IconButton
                    aria-label={t('WorkoutUpload.Preview.aria.remove')}
                    onClick={removeItem}
                >
                    <TrashIcon />
                </IconButton>
            </div>

            {existingData.length > 0 && (
                <FoundData data={data} foundData={existingData} />
            )}
        </li>
    );
};
