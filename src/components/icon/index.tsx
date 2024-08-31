import { FC } from 'react';

import { StatIconType } from '@/interfaces';
import { cn } from '@/utils/helpers';

interface Props {
    className?: string;
}

export const RoadIcon: FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        focusable="false"
        className={cn('h-6 w-6', className)}
    >
        <path
            fill="currentColor"
            d="M18.1 4.8c-.1-.5-.5-.8-1-.8H13l.2 3h-2.4l.2-3H6.8c-.5 0-.9.4-1 .8l-2.7 14c-.1.6.4 1.2 1 1.2H10l.3-5h3.4l.3 5h5.8c.6 0 1.1-.6 1-1.2l-2.7-14M10.4 13l.2-4h2.6l.2 4h-3z"
        ></path>
    </svg>
);

export const ClockIcon: FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 1024 1024"
        focusable="false"
        className={cn('h-6 w-6', className)}
    >
        <path
            fill="currentColor"
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        ></path>
        <path
            fill="currentColor"
            d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
        ></path>
    </svg>
);

export const SpeedeometerIcon: FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 512 512"
        focusable="false"
        className={cn('h-6 w-6', className)}
    >
        <path
            fill="currentColor"
            d="M326.1 231.9l-47.5 75.5a31 31 0 01-7 7 30.11 30.11 0 01-35-49l75.5-47.5a10.23 10.23 0 0111.7 0 10.06 10.06 0 012.3 14z"
        ></path>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0056.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0037.1-.1 173.13 173.13 0 01254.8 0 25.19 25.19 0 0037.1.1l3.2-3.5A223.18 223.18 0 00480 287.9C480 164.2 379.7 64 256 64z"
        ></path>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M256 128v32M416 288h-32M128 288H96M165.49 197.49l-22.63-22.63M346.51 197.49l22.63-22.63"
        ></path>
    </svg>
);

export const CounterIcon: FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        focusable="false"
        className={cn('h-6 w-6', className)}
    >
        <path
            fill="currentColor"
            d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2m0 2v12h7V6H4m16 12V6h-1.24c.24.54.19 1.07.19 1.13-.07.67-.54 1.37-.71 1.62l-2.33 2.55 3.32-.02.01 1.22-5.2-.03-.04-1s3.05-3.23 3.2-3.52c.14-.28.71-1.95-.7-1.95-1.23.05-1.09 1.3-1.09 1.3l-1.54.01s.01-.66.38-1.31H13v12h2.58l-.01-.86.97-.01s.91-.16.92-1.05c.04-1-.81-1-.96-1-.13 0-1.07.05-1.07.87h-1.52s.04-2.06 2.59-2.06c2.6 0 2.46 2.02 2.46 2.02s.04 1.25-1.11 1.72l.52.37H20M8.92 16h-1.5v-5.8l-1.8.56V9.53l3.14-1.12h.16V16z"
        ></path>
    </svg>
);

export const MapPinIcon: FC<Props> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={cn('h-6 w-6', className)}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
    </svg>
);

export const FileUpladIcon: FC<Props> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        className={cn('h-6 w-6', className)}
    >
        <path d="M9.293 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4.707A1 1 0 0013.707 4L10 .293A1 1 0 009.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 01-1-1zM6.354 9.854a.5.5 0 01-.708-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8.5 8.707V12.5a.5.5 0 01-1 0V8.707L6.354 9.854z" />
    </svg>
);

export const SpinnerIcon: FC<Props> = ({ className }) => (
    <svg
        fill="none"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        className={cn('h-6 w-6', className)}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            clipRule="evenodd"
            opacity={0.2}
        />
        <path
            fill="currentColor"
            d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z"
        />
    </svg>
);

export const getStatIcon = (iconType: StatIconType, isLineItem?: boolean) => {
    const classes = isLineItem
        ? 'h-5 w-5 text-primary'
        : 'h-8 w-8 text-primary';

    switch (iconType) {
        case 'road':
            return <RoadIcon className={classes} />;
        case 'clockCircle':
            return <ClockIcon className={classes} />;
        case 'speedometer':
            return <SpeedeometerIcon className={classes} />;
        case 'counter':
            return <CounterIcon className={classes} />;
        default:
            return null;
    }
};
