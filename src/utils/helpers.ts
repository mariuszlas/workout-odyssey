import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Cookie, Theme, UserData, WorkoutTypes } from '@/interfaces';
import dayjs from '@/utils/extended-dayjs';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isValidWorkoutType = (
    type: string | null | undefined
): type is WorkoutTypes =>
    Boolean(type) && Object.values(WorkoutTypes).includes(type as WorkoutTypes);

export const isValidTheme = (type: string | null | undefined): type is Theme =>
    Boolean(type) && Object.values(Theme).includes(type as Theme);

export const getWorkoutTypeFromPathname = (pathname: string) => {
    const workoutType = pathname.split('/').at(-1);

    if (!isValidWorkoutType(workoutType)) {
        notFound();
    }

    return workoutType;
};

type ErrorWithMessage = { message: string };

const isErrorWithMessage = (e: unknown): e is ErrorWithMessage =>
    typeof e === 'object' &&
    e !== null &&
    'message' in e &&
    typeof e.message === 'string' &&
    e.message.length !== 0;

export const getMsgFromError = (e: unknown) =>
    isErrorWithMessage(e) ? e.message : 'Could not get error details';

export const getClientCookie = (key: Cookie) =>
    document
        ? document.cookie
              .split('; ')
              .find(row => row.startsWith(`${key}=`))
              ?.split('=')
              .at(1)
        : null;

export const getCognitoAttribute = (
    data: UserData | undefined,
    type: 'email' | 'sub' | 'email_verified'
) => data?.cognitoAttributes?.find(({ Name }) => Name === type)?.Value;

export const capitalize = (s: string | undefined) =>
    s && s[0].toUpperCase() + s.slice(1);

export const formatDuration = (seconds: number, formatter = 'HH:mm:ss') =>
    dayjs.duration(seconds, 's').format(formatter);

export const formatPace = (seconds: number) =>
    dayjs.duration(seconds, 's').format('mm\'ss"');

export const getDateTimeTZ = (
    timestamp: Date | string | undefined,
    timezone: string | undefined,
    dateOnly = true
) => {
    if (!timestamp) return '';

    const dayjsDate = dayjs.utc(timestamp).tz(timezone);

    if (dateOnly) {
        return dayjsDate.format('DD/MM/YYYY');
    }

    return dayjsDate.format('DD/MM/YYYY, HH:mm');
};

export const getFormattedMonthAndYear = (
    year: number,
    month: number,
    locale: string,
    isShort?: boolean
) =>
    `${getMonthForLocale(month - 1, locale, isShort ? 'short' : 'long')} ${year}`;

export const getMonthForLocale = (
    month: number,
    locale: string,
    format: 'long' | 'short' = 'long'
) =>
    new Intl.DateTimeFormat(locale, { month: format }).format(
        new Date(2000, month)
    );
