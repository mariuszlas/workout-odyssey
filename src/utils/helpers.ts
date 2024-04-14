import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Cookie, Theme, UserData, WorkoutTypes } from '@/interfaces';

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
