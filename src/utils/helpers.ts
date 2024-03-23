import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Cookie, Theme, WorkoutTypes } from '@/interfaces';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isValidWorkoutType = (
    type: string | null | undefined
): type is WorkoutTypes =>
    Boolean(type) && Object.values(WorkoutTypes).includes(type as WorkoutTypes);

export const isValidTheme = (type: string | null | undefined): type is Theme =>
    Boolean(type) && Object.values(Theme).includes(type as Theme);

export const getWorkoutTypeFromPathname = (pathname: string) => {
    const workoutType = pathname.split('/').at(2);

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
    typeof e.message === 'string';

export const getGenericErrorMessage = (e: unknown, fallback: string) =>
    isErrorWithMessage(e) ? e.message : fallback;

export const getClientCookie = (key: Cookie) =>
    document
        ? document.cookie
              .split('; ')
              .find(row => row.startsWith(`${key}=`))
              ?.split('=')
              .at(0)
        : null;
