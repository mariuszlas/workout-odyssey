import type { Dispatch, FC, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { Alert, Badge, Button, Text } from '@/components';
import { NewWorkout, UserData } from '@/interfaces';
import { getMsgFromError } from '@/utils/helpers';

import { defaultNewWorkout } from '../helpers';
import { FileSizeError, parseXML, readFileAsync } from '../xmlParser';

interface Props {
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
    setWorkout: Dispatch<SetStateAction<NewWorkout>>;
}

export const FilePicker: FC<Props> = ({ file, setFile, setWorkout }) => {
    const { data: user } = useSWR<UserData>('/api/user');
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.file');
    const [error, setError] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement>(null);

    const readFile = async (file: File) => {
        try {
            if (user?.isDemo && file.size > 1000000) {
                throw new FileSizeError();
            }

            const xmlString = await readFileAsync(file);

            if (typeof xmlString !== 'string') {
                throw new Error('Not an XML');
            }
            const data = parseXML(xmlString, file.name);

            setWorkout(prev => ({
                ...prev,
                distance: data.distance,
                timestamp: data.timestamp.split('Z')[0],
                duration: data.duration,
                type: data.type,
                coordinates: data.coordinates,
            }));

            setFile(file);
        } catch (e) {
            if (e instanceof FileSizeError) {
                setError(t('errors.demoFileSize'));
            } else {
                setError(t('errors.generic'));
            }
            console.error(getMsgFromError(e));
        }
    };

    const onInputChange = async () => {
        if (ref.current && ref.current.files) {
            const file = ref.current.files[0];
            await readFile(file);
        }
    };

    const onButtonClick = () => {
        if (ref && ref.current) {
            setError(null);
            ref.current.click();
        }
    };

    const removeFile = () => {
        setWorkout(prev => ({ ...prev, ...defaultNewWorkout }));
        setFile(null);
    };

    return (
        <div>
            {error && (
                <Alert status="error" classes="my-4">
                    {error}
                </Alert>
            )}

            <div className="flex items-center justify-between gap-4">
                {file ? (
                    <Badge value={file.name} onClose={removeFile} />
                ) : (
                    <Text className="italic" value={t('noFileSelected')} />
                )}

                <input
                    type="file"
                    ref={ref}
                    className="hidden"
                    onChange={onInputChange}
                    accept=".tcx"
                />

                <Button
                    className="btn-outline btn-primary"
                    onClick={onButtonClick}
                >
                    {t('cta')}
                </Button>
            </div>
        </div>
    );
};
