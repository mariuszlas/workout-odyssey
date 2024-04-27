import type { FC } from 'react';
import { Fragment, useState } from 'react';
import { Popover } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import {
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
import { usePopover } from '@/hooks';
import type { TLabel } from '@/interfaces';

import { WorkoutForm } from '../intrefaces';

import { getNewLabel, validateNewLabel } from './helpers';

export const LabelSelector: FC<WorkoutForm> = ({ setWorkouts, workout }) => {
    const { data, isLoading } = useSWR<TLabel[]>('/api/labels');
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.labels');
    const [newLabelValue, setNewLabelValue] = useState<string>('');
    const [newLabels, setNewLabels] = useState<TLabel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { setRefEl, setPopperElement, styles, attributes } = usePopover();

    const labels = data ?? [];
    const isNoLabels = labels?.length + newLabels.length === 0 && !isLoading;
    const isLabelsList = !isNoLabels && !isLoading;

    const handleAddNewLabel = () => {
        setError(null);

        try {
            validateNewLabel(labels, newLabels, newLabelValue);
            const newLabel = getNewLabel(labels, newLabels, newLabelValue);
            setNewLabels(state => [...state, newLabel]);
            setNewLabelValue('');
        } catch (_) {
            setError(t('error'));
        }
    };

    const renderLabelsList = (labels: TLabel[], close: () => void) =>
        labels?.map(label => (
            <MenuButton
                key={label.color + label.value}
                hoverNoColor
                onClick={() => {
                    setWorkouts(prev =>
                        prev.map(wk =>
                            wk.id === workout.id ? { ...wk, label } : wk
                        )
                    );
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
        <div className="flex flex-wrap items-center justify-between gap-4">
            <Popover>
                <Popover.Button as={Fragment}>
                    <Button className="btn-outline btn-primary" ref={setRefEl}>
                        {t('cta')}
                    </Button>
                </Popover.Button>

                <MenuTransition>
                    <Popover.Panel
                        className="w-72 rounded-lg border border-base-content border-opacity-20 bg-base-100 p-2 shadow-2xl focus:outline-none"
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                        {({ close }) => (
                            <>
                                <div className="w-full">
                                    <Input
                                        type="text"
                                        value={newLabelValue}
                                        onChange={e =>
                                            setNewLabelValue(e.target.value)
                                        }
                                        placeholder={t('placeholder')}
                                        className="pr-10"
                                        error={error}
                                    >
                                        <IconButton
                                            onClick={handleAddNewLabel}
                                            className="absolute right-0"
                                            aria-label={t('placeholder')}
                                        >
                                            <PlusIcon />
                                        </IconButton>
                                    </Input>
                                </div>
                                {labels?.length + newLabels?.length > 0 && (
                                    <hr className="mb-2 mt-4 border-t border-t-base-content border-opacity-20 " />
                                )}
                                <div className="max-h-44 overflow-y-scroll">
                                    {isLoading && (
                                        <div className="flex flex-col items-stretch gap-3 p-3">
                                            <SkeletonList length={6} />
                                        </div>
                                    )}
                                    {isNoLabels && (
                                        <div className="flex justify-center p-3">
                                            <Text value={t('noLabels')} />
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
                        setWorkouts(prev =>
                            prev.map(wk =>
                                wk.id === workout.id
                                    ? { ...wk, label: null }
                                    : wk
                            )
                        )
                    }
                />
            )}
        </div>
    );
};
