import type { FC } from 'react';
import { Fragment, useEffect } from 'react';
import { Popover } from '@headlessui/react';

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
import { _t, daysOfWeek } from '@/constants';
import { cn } from '@/utils/helpers';
import { getMonth } from '@/views/helpers';

import { NewWorkoutProps } from '../intrefaces';

import { zeroPad } from './helpers';

const getTotalDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

const getDayOfTheWeekOfTheFirstDayOfTheMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDay();

const formatDate = (date: Date) => {
    const dateString = date.toLocaleString();
    return dateString.slice(0, dateString.length - 3);
};

const getMonthDays = (year: number, month: number) => [
    ...Array(getTotalDaysInMonth(year, month)).keys(),
];

export const DatetimePicker: FC<NewWorkoutProps> = ({
    workout,
    setWorkout,
}) => {
    const { timestamp } = workout;
    const date = timestamp ? new Date(timestamp) : new Date();

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
        daysOfWeek.map((day, idx) => (
            <div key={idx} className="flex justify-center">
                <div className="flex justify-center">
                    <Text>{day}</Text>
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
            <FormLabel text={_t.selectDateTime} />
            <Popover>
                <Popover.Button as={Fragment}>
                    <InputButton className="w-50">
                        <Text>{formatDate(date)}</Text>
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
                                            aria-label="Previous month"
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

                                        <Text>
                                            {getMonth(date.getMonth())}{' '}
                                            {date.getFullYear()}
                                        </Text>

                                        <IconButton
                                            aria-label="Next month"
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
                                    <Text>{_t.time}</Text>

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

                                        <Text>:</Text>

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
                                        {_t.btnToday}
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => close()}
                                        type="button"
                                    >
                                        {_t.btnDone}
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
