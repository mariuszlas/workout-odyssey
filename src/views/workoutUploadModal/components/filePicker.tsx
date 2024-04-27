import type { Dispatch, DragEvent, FC, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { Alert, Button, FileUpladIcon, Text } from '@/components';
import { NewWorkout, UserData } from '@/interfaces';
import { getMsgFromError } from '@/utils/helpers';

import { defaultNewWorkout } from '../helpers';
import { FileSizeError, readFilesAsync } from '../xmlParser';

import { validateFileSize } from './helpers';

interface Props {
    setWorkouts: Dispatch<SetStateAction<NewWorkout[]>>;
}

const ACCEPTED_FILE_TYPE = '.tcx';

export const FilePicker: FC<Props> = ({ setWorkouts }) => {
    const { data: user } = useSWR<UserData>('/api/user');
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.files');
    const [error, setError] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement>(null);

    const readFiles = async (fileList: FileList) => {
        try {
            const files = Array.from(fileList);
            validateFileSize(files, user?.isDemo);
            const filesData = await readFilesAsync(files);

            const state = filesData.map((fileData, idx) => ({
                ...defaultNewWorkout,
                distance: fileData.distance,
                timestamp: fileData.timestamp.split('Z')[0],
                duration: fileData.duration,
                type: fileData.type,
                coordinates: fileData.coordinates,
                file: files[idx],
                id: idx,
            }));

            setWorkouts(state);
        } catch (e) {
            if (e instanceof FileSizeError) {
                setError(t('errors.demoFileSize'));
            } else {
                setError(t('errors.generic'));
            }
            console.error(getMsgFromError(e));
        }
    };

    const handleBrowseFilesBtn = () => {
        if (ref && ref.current) {
            setError(null);
            ref.current.click();
        }
    };

    const onInputChange = async () => {
        if (ref.current && ref.current.files) {
            await readFiles(ref.current.files);
        }
    };

    const handleFileDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            await readFiles(droppedFiles);
        }
    };

    return (
        <>
            {error && <Alert status="error" classes="my-4" content={error} />}
            <Alert
                classes="m-0 p-2"
                status="info"
                title={t('fileTypeTitle')}
                content={t('fileTypeInfo')}
            />
            <div
                className="flex flex-col items-center gap-4 rounded-lg border border-teal-500 bg-teal-50 p-4"
                onDrop={handleFileDrop}
                onDragOver={e => {
                    e.preventDefault();
                }}
            >
                <FileUpladIcon className="h-8 w-8 text-primary" />
                <Text> {t('description')}</Text>
                <Button onClick={handleBrowseFilesBtn}>{t('cta')}</Button>
                <input
                    type="file"
                    ref={ref}
                    className="hidden"
                    onChange={onInputChange}
                    accept={ACCEPTED_FILE_TYPE}
                    multiple
                />
            </div>
        </>
    );
};
