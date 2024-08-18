'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { WorkoutPreview } from '@/interfaces';

import { ConfirmationModal } from './components';
import { FilesUpload } from './filesUpload';
import { ManualUpload } from './manualUpload';

interface Props {
    setPreviewData: Dispatch<SetStateAction<WorkoutPreview>>;
}

enum TabValue {
    FILE = 'file',
    MANUAL = 'manual',
}

export const FormsPanel: FC<Props> = ({ setPreviewData }) => {
    const [selectedTab, setSelectedTab] = useState(TabValue.FILE);
    const [isOpen, setIsOpen] = useState(false);
    const [hasFilesSelected, setHasFilesSelected] = useState(false);

    const onTabSelection = (value: string) => {
        if (selectedTab === TabValue.FILE && hasFilesSelected) {
            setIsOpen(true);
            return;
        }
        setSelectedTab(value as TabValue);
    };

    return (
        <>
            <Tabs
                defaultValue={TabValue.FILE}
                value={selectedTab}
                onValueChange={onTabSelection}
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={TabValue.FILE}>Upload File</TabsTrigger>
                    <TabsTrigger value={TabValue.MANUAL}>
                        Add Data Manually
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={TabValue.FILE}>
                    <FilesUpload
                        setPreviewData={setPreviewData}
                        setHasFilesSelected={setHasFilesSelected}
                    />
                </TabsContent>
                <TabsContent value={TabValue.MANUAL}>
                    <ManualUpload setPreviewData={setPreviewData} />
                </TabsContent>
            </Tabs>

            <ConfirmationModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                confirmAction={() => {
                    setSelectedTab(TabValue.MANUAL);
                    setIsOpen(false);
                }}
            />
        </>
    );
};
