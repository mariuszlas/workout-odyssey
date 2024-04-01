'use client';

import type { FC, ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { useFormState } from 'react-dom';
import { Tab } from '@headlessui/react';

import { _t, Button } from '@/components';
import type { NewWorkout, Workout, WorkoutPreview } from '@/interfaces';
import { WorkoutTypes } from '@/interfaces';
import { cn } from '@/utils/helpers';

import { getWorkoutPreview } from './action';
import {
    ActivitySelector,
    DatetimePicker,
    DistanceInput,
    DurationPicker,
    FileInfo,
    FilePicker,
    LabelSelector,
    NotesInput,
    TimezoneSelector,
} from './components';
import { formatAndValidateData } from './helpers';

interface Props {
    editWorkout?: Workout;
    setPreviewData: (data: WorkoutPreview | null) => void;
}

interface CustomTabProps {
    isDisabled?: boolean;
    children: ReactNode;
}

const CustomTab: FC<CustomTabProps> = ({ isDisabled, children }) => (
    <Tab as={Fragment}>
        {({ selected }) => (
            <button
                disabled={isDisabled}
                className={cn('tab h-full w-full p-2 text-base font-semibold', {
                    'tab-active text-primary': selected,
                })}
            >
                {children}
            </button>
        )}
    </Tab>
);

const defaultNewWorkout = {
    type: WorkoutTypes.RUNNING,
    timestamp: '',
    utcOffset: new Date().getTimezoneOffset() / -60,
    distance: 0,
    duration: 0,
    coordinates: [],
    label: null,
    notes: null,
};

export const FormsPanel: FC<Props> = ({ editWorkout, setPreviewData }) => {
    const [workout, setWorkout] = useState<NewWorkout>(
        editWorkout ? { ...editWorkout, coordinates: [] } : defaultNewWorkout
    );
    const props = { setWorkout, workout };

    const [formState, action] = useFormState(
        () =>
            getWorkoutPreview(
                formatAndValidateData(workout, editWorkout && editWorkout.id)
            ),
        undefined
    );

    if (formState?.ok) {
        setPreviewData(formState.preview);
    }

    return (
        <form action={action}>
            <Tab.Group defaultIndex={editWorkout ? 1 : 0}>
                <Tab.List className="tabs tabs-bordered">
                    <CustomTab isDisabled={!!editWorkout}>
                        {_t.btnUploadFile}
                    </CustomTab>

                    <CustomTab>
                        {editWorkout ? _t.btnEditWorkout : _t.btnAddData}
                    </CustomTab>
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className="flex flex-col items-stretch gap-4 py-4">
                            <FilePicker setWorkout={setWorkout} />
                            <FileInfo />
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="flex flex-wrap justify-between gap-2 py-4">
                            <ActivitySelector {...props} />
                            <DistanceInput {...props} />
                            <DurationPicker {...props} />
                            <DatetimePicker {...props} />
                            <TimezoneSelector {...props} />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <div className="flex flex-col items-stretch gap-4">
                <LabelSelector {...props} />
                <NotesInput {...props} />
            </div>

            <Button className="btn-primary btn-block mt-8" type="submit">
                {_t.btnUpload}
            </Button>
        </form>
    );
};
