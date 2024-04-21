import type { FC, MutableRefObject } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import { useTranslations } from 'next-intl';

import {
    CloseButton,
    FormLabel,
    Heading,
    Input,
    InputButton,
    MenuTransition,
} from '@/components';
import dayjs from '@/utils/extended-dayjs';
import { formatDuration } from '@/utils/helpers';

import { NewWorkoutProps } from '../intrefaces';

type PopoverOnClose = (
    focusableElement?:
        | HTMLElement
        | MutableRefObject<HTMLElement | null>
        | undefined
) => void;

export const DurationPicker: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => {
    const { duration } = workout;
    const [s, setS] = useState(dayjs.duration(duration, 's').seconds());
    const [m, setM] = useState(dayjs.duration(duration, 's').minutes());
    const [h, setH] = useState(dayjs.duration(duration, 's').hours());

    const t = useTranslations('Dashboard.WorkoutUpload.Forms.duration');

    useEffect(() => {
        if (isNaN(h)) setH(0);
        if (isNaN(m)) setM(0);
        if (isNaN(s)) setS(0);

        setWorkout(prev => ({ ...prev, duration: s + m * 60 + h * 3600 }));
    }, [s, m, h, setWorkout]);

    const durationFields = [
        {
            label: t('labelHours'),
            plcd: t('plcdHours'),
            formatter: 'HH',
            setD: setH,
        },
        {
            label: t('labelMinutes'),
            plcd: t('plcdMinutes'),
            formatter: 'mm',
            setD: setM,
        },
        {
            label: t('labelSeconds'),
            plcd: t('plcdSeconds'),
            formatter: 'ss',
            setD: setS,
        },
    ];

    const renderDurationFields = (onClose: PopoverOnClose) =>
        durationFields.map(({ label, plcd, formatter, setD }, idx) => (
            <div className="w-fit" key={idx}>
                <FormLabel text={label} />
                <Input
                    placeholder={plcd}
                    value={formatDuration(duration, formatter)}
                    onChange={e => setD(Number(e.target.value))}
                    className="w-20"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            onClose();
                            e.preventDefault();
                        }
                    }}
                />
            </div>
        ));

    return (
        <div className="relative w-fit">
            <FormLabel text={t('label')} isRequired />

            <Popover>
                <Popover.Button as={Fragment}>
                    <InputButton className="w-24">
                        {formatDuration(duration)}
                    </InputButton>
                </Popover.Button>

                <MenuTransition>
                    <Popover.Panel className="absolute right-0 z-10 mt-2 max-w-md rounded-lg border border-base-content border-opacity-20 bg-base-100 bg-opacity-100 p-4 opacity-100 shadow-2xl focus:outline-none">
                        {({ close }) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <Heading as="h3" className="text-xl">
                                        {t('header')}
                                    </Heading>

                                    <CloseButton onClick={() => close()} />
                                </div>

                                <hr className="my-2 border-t border-t-base-content border-opacity-20 " />

                                <div className="flex gap-4">
                                    {renderDurationFields(close)}
                                </div>
                            </>
                        )}
                    </Popover.Panel>
                </MenuTransition>
            </Popover>
        </div>
    );
};
