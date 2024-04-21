import type { FC } from 'react';
import { Fragment, useEffect } from 'react';
import { Popover } from '@headlessui/react';
import { useLocale, useTranslations } from 'next-intl';

import {
    ArrowLeft,
    ArrowRight,
    CalendarIcon,
    FormLabel,
    IconButton,
    InputButton,
    MenuTransition,
    Select,
    Text,
} from '@/components';
import { cn, getDateTimeTZ, getMonthForLocale } from '@/utils/helpers';

import { NewWorkoutProps } from '../intrefaces';

import { getWeekdayListForLocale, zeroPad } from './helpers';

const getTotalDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

const getDayOfTheWeekOfTheFirstDayOfTheMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDay();

const getMonthDays = (year: number, month: number) => [
    ...Array(getTotalDaysInMonth(year, month)).keys(),
];

export const DatetimePicker: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => {
    const { timestamp } = workout;
    const date = timestamp ? new Date(timestamp) : new Date();

    const t = useTranslations('Dashboard.WorkoutUpload.Forms.dateAndTime');
    const locale = useLocale();

    const setTimestamp = (t: string) => {
        setWorkout(prev => ({ ...prev, timestamp: t }));
    };

    useEffect(() => {
        if (!timestamp) {
            setTimestamp(date.toISOString());
        }
    }, []);

    const allCurrentMonthDays = getMonthDays(
        date.getFullYear(),
        date.getMonth() + 1
    );
    const allPreviousMonthDays = getMonthDays(
        date.getFullYear(),
        date.getMonth()
    );
    const allNextMonthDays = getMonthDays(
        date.getFullYear(),
        date.getMonth() + 2
    );

    const dayOfTheWeekOfTheFirstDayOfTheMonth =
        getDayOfTheWeekOfTheFirstDayOfTheMonth(
            date.getFullYear(),
            date.getMonth()
        );

    const numberOfPreviousMonthDaysToDiscard =
        allPreviousMonthDays.length - dayOfTheWeekOfTheFirstDayOfTheMonth;

    const previousMonthDays = allPreviousMonthDays.slice(
        numberOfPreviousMonthDaysToDiscard
    );

    const currentAndPreviousMonthDaysTotal =
        previousMonthDays.concat(allCurrentMonthDays).length;

    const numberOfWeeks = Math.ceil(currentAndPreviousMonthDaysTotal / 7);
    const numberOfNextMonthDaysToAdd =
        numberOfWeeks * 7 - currentAndPreviousMonthDaysTotal;
    const nextMonthDays = allNextMonthDays.slice(0, numberOfNextMonthDaysToAdd);

    const getHoursFromDate = () => date.toLocaleTimeString().split(':')[0];
    const getMinutesFromDate = () => date.toLocaleTimeString().split(':')[1];

    const renderNumberOptions = (n: number) =>
        [...Array(n).keys()].map((n, idx) => (
            <option value={n} key={idx}>
                {zeroPad(n)}
            </option>
        ));

    const setDate = (month: number, day: number) => {
        setTimestamp(new Date(date.getFullYear(), month, day).toISOString());
    };

    const renderDaysOfWeekRow = () =>
        getWeekdayListForLocale(locale).map((day, idx) => (
            <div key={idx} className="flex justify-center">
                <div className="flex justify-center">
                    <Text value={day} />
                </div>
            </div>
        ));

    const renderMonthDays = (days: number[], month: number) =>
        days.map((day, idx) => (
            <div key={idx} className="flex justify-center">
                <button
                    className="btn btn-ghost btn-sm w-full text-gray-500"
                    onClick={() => setDate(month, day + 1)}
                    type="button"
                >
                    {day + 1}
                </button>
            </div>
        ));

    const renderPreviousMonthDays = () =>
        renderMonthDays(previousMonthDays, date.getMonth() - 1);

    const renderNextMonthDays = () =>
        renderMonthDays(nextMonthDays, date.getMonth() + 1);

    const renderCurrentMonthDays = () =>
        allCurrentMonthDays.map((day, idx) => (
            <div key={idx} className="flex justify-center">
                <button
                    className={cn(
                        'btn btn-sm w-full',
                        day === date.getDate() - 1 ? 'btn-primary' : '',
                        day === date.getDate() - 1 ? 'btn' : 'btn-ghost'
                    )}
                    onClick={() => setDate(date.getMonth(), day + 1)}
                    type="button"
                >
                    {day + 1}
                </button>
            </div>
        ));

    return (
        <div className="relative">
            <FormLabel text={t('label')} />
            <Popover>
                <Popover.Button as={Fragment}>
                    <InputButton className="w-50">
                        <Text
                            value={getDateTimeTZ(date, workout.timezone, false)}
                        />
                        <CalendarIcon className="hidden sm:block" />
                    </InputButton>
                </Popover.Button>

                <MenuTransition>
                    <Popover.Panel className="absolute left-0 z-10 mt-2 w-fit rounded-lg border border-base-content border-opacity-20 bg-base-100 p-4 shadow-2xl focus:outline-none">
                        {({ close }) => (
                            <div className="flex flex-col justify-center gap-2">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <IconButton
                                            aria-label={t('aria.previousMonth')}
                                            onClick={() =>
                                                setDate(
                                                    date.getMonth() - 1,
                                                    date.getDate()
                                                )
                                            }
                                            className="h-8 w-8"
                                        >
                                            <ArrowLeft />
                                        </IconButton>

                                        <Text
                                            value={`${getMonthForLocale(date.getMonth(), locale)} ${date.getFullYear()}`}
                                        />

                                        <IconButton
                                            aria-label={t('aria.nextMonth')}
                                            onClick={() =>
                                                setDate(
                                                    date.getMonth() + 1,
                                                    date.getDate()
                                                )
                                            }
                                            className="h-8 w-8"
                                        >
                                            <ArrowRight />
                                        </IconButton>
                                    </div>
                                </div>

                                <div
                                    className={cn(
                                        'grid grid-cols-7',
                                        `grid-rows-${numberOfWeeks}`
                                    )}
                                >
                                    {renderDaysOfWeekRow()}
                                    {renderPreviousMonthDays()}
                                    {renderCurrentMonthDays()}
                                    {renderNextMonthDays()}
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <Text value={t('timeLabel')} />

                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={getHoursFromDate()}
                                            onChange={e => {
                                                const newDate = new Date(date);
                                                newDate.setHours(
                                                    Number(e.target.value)
                                                );
                                                setTimestamp(
                                                    newDate.toISOString()
                                                );
                                            }}
                                            className="h-8"
                                        >
                                            {renderNumberOptions(24)}
                                        </Select>

                                        <Text value=":" />

                                        <Select
                                            value={getMinutesFromDate()}
                                            onChange={e => {
                                                const newDate = new Date(date);
                                                newDate.setMinutes(
                                                    Number(e.target.value)
                                                );
                                                setTimestamp(
                                                    newDate.toISOString()
                                                );
                                            }}
                                            className="h-8"
                                        >
                                            {renderNumberOptions(60)}
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        className="btn btn-outline btn-primary btn-sm"
                                        onClick={() => {
                                            setTimestamp(
                                                new Date().toISOString()
                                            );
                                            close();
                                        }}
                                        type="button"
                                    >
                                        {t('ctaSecondary')}
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => close()}
                                        type="button"
                                    >
                                        {t('cta')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popover.Panel>
                </MenuTransition>
            </Popover>
        </div>
    );
};
