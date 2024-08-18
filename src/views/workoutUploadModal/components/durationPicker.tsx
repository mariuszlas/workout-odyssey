import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
    Button,
    CloseButton,
    H3,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Separator,
} from '@/components';
import dayjs from '@/utils/extended-dayjs';
import { cn, formatDuration } from '@/utils/helpers';

import { WorkoutForm } from '../intrefaces';

export const DurationPicker: FC<WorkoutForm> = ({ workout, setWorkouts }) => {
    const t = useTranslations('Dashboard.WorkoutUpload.Forms.duration');
    const { duration } = workout;

    const [isOpen, setIsOpen] = useState(false);
    const [s, setS] = useState(dayjs.duration(duration, 's').seconds());
    const [m, setM] = useState(dayjs.duration(duration, 's').minutes());
    const [h, setH] = useState(dayjs.duration(duration, 's').hours());

    useEffect(() => {
        if (isNaN(h)) setH(0);
        if (isNaN(m)) setM(0);
        if (isNaN(s)) setS(0);
        const duration = s + m * 60 + h * 3600;

        setWorkouts(prev =>
            prev.map(wk => (wk.id === workout.id ? { ...wk, duration } : wk))
        );
    }, [s, m, h, setWorkouts]);

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

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex flex-col justify-center gap-1 pt-1">
                <Label htmlFor="duration" isRequired>
                    {t('label')}
                </Label>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn('justify-start text-left font-normal')}
                        id="duration"
                    >
                        {formatDuration(duration)}
                    </Button>
                </PopoverTrigger>
            </div>

            <PopoverContent className="w-auto">
                <div className="flex items-center justify-between">
                    <H3>{t('header')}</H3>
                    <CloseButton onClick={() => setIsOpen(false)} />
                </div>
                <Separator className="my-2" />
                <div className="flex gap-4">
                    {durationFields.map(
                        ({ label, plcd, formatter, setD }, idx) => (
                            <div className="w-fit" key={idx}>
                                <Label>{label}</Label>
                                <Input
                                    placeholder={plcd}
                                    value={formatDuration(duration, formatter)}
                                    onChange={e => setD(Number(e.target.value))}
                                    className="w-16"
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            setIsOpen(false);
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
