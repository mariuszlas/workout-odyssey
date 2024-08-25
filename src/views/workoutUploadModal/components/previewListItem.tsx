'use client';

import { type FC } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import {
    Badge,
    DateEntry,
    Distance,
    Duration,
    IconButton,
    TextS,
} from '@/components';
import type { UploadWorkout, Workout } from '@/interfaces';
import { useUI } from '@/providers';
import { cn } from '@/utils/helpers';

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

    const existingData = isEdit
        ? foundData.filter(workout => workout.id !== data.id)
        : foundData;

    return (
        <li
            className={cn(
                'flex w-full flex-col gap-4 rounded-lg border border-opacity-20 px-4 py-2',
                existingData.length > 0
                    ? 'border-warning border-2'
                    : 'border-base-content'
            )}
        >
            <div className="flex justify-between gap-4">
                <div className="overflow-hidden overflow-ellipsis">
                    <div className="flex items-center gap-4">
                        <TextS className="font-medium capitalize">
                            {data.type}
                        </TextS>
                        {data?.label && <Badge label={data.label} />}
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
                    aria-label="Remove this workout from the list"
                    onClick={removeItem}
                >
                    <TrashIcon className="h-6 w-6" />
                </IconButton>
            </div>

            {existingData.length > 0 && (
                <FoundData data={data} foundData={existingData} />
            )}
        </li>
    );
};
