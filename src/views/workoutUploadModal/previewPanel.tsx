'use client';

import { Dispatch, type FC, SetStateAction, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';

import { Alert, Button, notify } from '@/components';
import type { WorkoutPreview } from '@/interfaces';

import { addNewWorkouts } from './action';
import { PreviewListItem } from './components';

interface Props {
    workoutPreview: WorkoutPreview;
    setPreviewData: Dispatch<SetStateAction<WorkoutPreview>>;
    isEdit: boolean;
    onClose: () => void;
}

export const PreviewPanel: FC<Props> = ({
    workoutPreview,
    setPreviewData,
    isEdit,
    onClose,
}) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Preview');

    const [formState, action] = useFormState(
        () =>
            addNewWorkouts(
                workoutPreview.map(({ data }) => data),
                isEdit
            ),
        undefined
    );

    const isExistingData = workoutPreview?.some(obj => {
        if (isEdit) {
            return (
                obj.foundData?.length > 0 &&
                obj.foundData.some(
                    foundDataObj => foundDataObj.id !== obj.data.id
                )
            );
        } else {
            return obj.foundData?.length > 0;
        }
    });

    useEffect(() => {
        if (formState?.ok) {
            if (isEdit) {
                notify.success(t('notify.updateSuccess'));
                onClose();
            } else {
                notify.success(t('notify.uploadSuccess'));
                setPreviewData([]);
            }
        }

        if (formState?.error) {
            notify.error(formState.error);
        }
    }, [formState]);

    return (
        <>
            <div className="flex flex-1 flex-col gap-4">
                {isExistingData && (
                    <Alert
                        classes="m-0 p-2"
                        status="warning"
                        title={t('warningTitle')}
                        content={t('warningAlert')}
                    />
                )}

                <ul className="flex max-h-96 flex-wrap gap-3 overflow-y-scroll">
                    {workoutPreview.map((item, idx) => (
                        <PreviewListItem
                            key={idx}
                            {...item}
                            isEdit={isEdit}
                            removeItem={() => {
                                setPreviewData(prev =>
                                    prev.filter(
                                        prevObj =>
                                            prevObj.data.id !== item.data.id
                                    )
                                );
                            }}
                        />
                    ))}
                </ul>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Button
                    className="btn-ghost"
                    onClick={() => setPreviewData([])}
                >
                    {t('ctaSecondary')}
                </Button>

                <form action={action}>
                    <Button className="btn-primary" type="submit">
                        {t('cta')}
                    </Button>
                </form>
            </div>
        </>
    );
};
