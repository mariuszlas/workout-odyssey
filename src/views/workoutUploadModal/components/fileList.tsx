'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';

import { TextP } from '@/components';
import type { NewWorkout } from '@/interfaces';

import { FileLineItem } from './fileLineItem';

interface Props {
    workouts: NewWorkout[];
    setWorkouts: Dispatch<SetStateAction<NewWorkout[]>>;
}

export const FileList: FC<Props> = ({ setWorkouts, workouts }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>();

    if (!workouts.length) {
        return <TextP className="text-sm italic">No files selected</TextP>;
    }

    const selectedWorkout =
        isFormOpen &&
        selectedWorkoutId !== undefined &&
        workouts.find(wk => wk.id === selectedWorkoutId);

    const props = {
        setWorkouts,
        isFormOpen,
        setIsFormOpen,
        setSelectedWorkoutId,
    };

    return (
        <ul className="flex max-h-64 flex-wrap gap-2 overflow-y-scroll">
            {selectedWorkout ? (
                <FileLineItem workout={selectedWorkout} {...props} />
            ) : (
                <>
                    {workouts.map((workout, idx) => (
                        <FileLineItem workout={workout} {...props} key={idx} />
                    ))}
                </>
            )}
        </ul>
    );
};
