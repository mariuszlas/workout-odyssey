'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { WorkoutPreview } from '@/interfaces';

import { ConfirmationModal } from './components';
import { FilesUpload } from './filesUpload';
import { ManualUpload } from './manualUpload';

interface Props {
    setPreviewData: Dispatch<SetStateAction<WorkoutPreview>>;
}

export const FormsPanel: FC<Props> = ({ setPreviewData }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [hasFilesSelected, setHasFilesSelected] = useState(false);
    const t = useTranslations('Dashboard.WorkoutUpload.Forms');

    const onTabSelection = () => {
        if (selectedIndex === 0 && hasFilesSelected) {
            setIsOpen(true);
            return;
        }
        setSelectedIndex(prev => (prev === 0 ? 1 : 0));
    };

    return (
        <>
            <Tabs defaultValue="file">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file" onClick={onTabSelection}>
                        {t('tabUploadFile')}
                    </TabsTrigger>
                    <TabsTrigger value="manual" onClick={onTabSelection}>
                        {t('tabAddData')}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="file">
                    <FilesUpload
                        setPreviewData={setPreviewData}
                        setHasFilesSelected={setHasFilesSelected}
                    />
                </TabsContent>
                <TabsContent value="manual">
                    <ManualUpload setPreviewData={setPreviewData} />
                </TabsContent>
            </Tabs>

            <ConfirmationModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                confirmAction={() => {
                    setSelectedIndex(1);
                    setIsOpen(false);
                }}
            />
        </>
    );
};
