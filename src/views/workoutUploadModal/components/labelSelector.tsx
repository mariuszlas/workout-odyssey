import type { FC, MouseEvent } from 'react';
import { Fragment, useState } from 'react';
import { Popover } from '@headlessui/react';
import useSWR from 'swr';

import {
    _t,
    Button,
    IconButton,
    Input,
    Label,
    MenuButton,
    MenuTransition,
    PlusIcon,
    SkeletonList,
    Text,
} from '@/components';
import type { TLabel } from '@/interfaces';

import { NewWorkoutProps } from '../intrefaces';

import { getNewLabel, validateNewLabel } from './helpers';

export const LabelSelector: FC<NewWorkoutProps> = ({ setWorkout, workout }) => {
    const { data, isLoading } = useSWR<TLabel[]>('/api/labels');
    const labels = data ?? [];

    const [newLabelValue, setNewLabelValue] = useState<string>('');
    const [newLabels, setNewLabels] = useState<TLabel[]>([]);
    const [error, setError] = useState<string | null>(null);

    const isNoLabels = labels?.length + newLabels.length === 0 && !isLoading;
    const isLabelsList = !isNoLabels && !isLoading;

    const handleAddNewLabel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError(null);

        try {
            validateNewLabel(labels, newLabels, newLabelValue);
            const newLabel = getNewLabel(labels, newLabels, newLabelValue);
            setNewLabels(state => [...state, newLabel]);
            setNewLabelValue('');
        } catch (_) {
            setError(_t.errorDataInput);
        }
    };

    const renderLabelsList = (labels: TLabel[], close: () => void) =>
        labels?.map(label => (
            <MenuButton
                key={label.color + label.value}
                hoverNoColor
                onClick={() => {
                    setWorkout(prev => ({ ...prev, label }));
                    close();
                }}
            >
                <div
                    className="h-4 w-6 rounded-full"
                    style={{ background: `${label.color}` }}
                />
                <Text value={label.value} />
            </MenuButton>
        ));

    return (
        <div className="relative flex flex-wrap items-center justify-between gap-4">
            <Popover>
                <Popover.Button as={Fragment}>
                    <Button className="btn-outline btn-primary">
                        {_t.btnSelectLabel}
                    </Button>
                </Popover.Button>

                <MenuTransition>
                    <Popover.Panel className="absolute left-0 z-10 mt-1 w-72 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none">
                        {({ close }) => (
                            <>
                                <form className="relative w-full">
                                    <Input
                                        type="text"
                                        value={newLabelValue}
                                        onChange={e =>
                                            setNewLabelValue(e.target.value)
                                        }
                                        placeholder={_t.plcdAddLabel}
                                        className="pr-10"
                                        error={error}
                                    >
                                        <IconButton
                                            onClick={e => handleAddNewLabel(e)}
                                            type="submit"
                                            className="absolute right-0"
                                        >
                                            <PlusIcon />
                                        </IconButton>
                                    </Input>
                                </form>

                                {labels?.length + newLabels?.length > 0 && (
                                    <hr className="mb-2 mt-4 border-t border-t-base-content border-opacity-20 " />
                                )}

                                <div className="max-h-44 overflow-y-scroll">
                                    {isLoading && (
                                        <div className="flex flex-col items-stretch gap-3 p-3">
                                            <SkeletonList length={3} />
                                        </div>
                                    )}

                                    {isNoLabels && (
                                        <div className="flex justify-center p-3">
                                            <Text value={_t.noLabels} />
                                        </div>
                                    )}

                                    {isLabelsList && (
                                        <>
                                            {renderLabelsList(
                                                newLabels,
                                                close
                                            )?.reverse()}
                                            {renderLabelsList(labels, close)}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </Popover.Panel>
                </MenuTransition>
            </Popover>

            {workout?.label && (
                <Label
                    label={workout.label}
                    onClose={() =>
                        setWorkout(prev => ({ ...prev, label: null }))
                    }
                />
            )}
        </div>
    );
};
