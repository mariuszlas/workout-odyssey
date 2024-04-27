'use client';

import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useTranslations } from 'next-intl';

import type { WorkoutPreview } from '@/interfaces';
import { cn } from '@/utils/helpers';

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
            <Tab.Group selectedIndex={selectedIndex} onChange={onTabSelection}>
                <div>
                    <Tab.List className="tabs tabs-bordered">
                        <CustomTab>{t('tabUploadFile')} </CustomTab>
                        <CustomTab>{t('tabAddData')}</CustomTab>
                    </Tab.List>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <FilesUpload
                            setPreviewData={setPreviewData}
                            setHasFilesSelected={setHasFilesSelected}
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ManualUpload setPreviewData={setPreviewData} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

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

const CustomTab: FC<{ children: ReactNode }> = ({ children }) => (
    <Tab as={Fragment}>
        {({ selected }) => (
            <button
                className={cn('tab h-full w-full p-2 text-base font-semibold', {
                    'tab-active text-primary': selected,
                })}
            >
                {children}
            </button>
        )}
    </Tab>
);
