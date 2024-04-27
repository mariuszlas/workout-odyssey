import type { TLabel } from '@/interfaces';

import { FileSizeError } from '../xmlParser';

const DEMO_USER_MAX_FILE_SIZE = 1000000;

export const labelColors = [
    '#b40813',
    '#d6411d',
    '#fac82f',
    '#198921',
    '#0c6b74',
    '#2579d8',
    '#0c56c9',
    '#542be3',
];

export const zeroPad = (n: number | string) =>
    Number(n) < 10 ? `0${n}` : n.toString();

export const formatNewLabelValue = (newLabelValue: string) =>
    newLabelValue.replace(/^\s+|\s+$/g, '');

export const validateNewLabel = (
    allLabels: TLabel[],
    newLabels: TLabel[],
    newLabelValue: string
): void => {
    const formatedNewLabelValue = formatNewLabelValue(newLabelValue);

    if (formatedNewLabelValue.length === 0 || formatedNewLabelValue.length > 25)
        throw new Error('A label must contain between 1 and 25 characters');

    if (/;/g.test(formatedNewLabelValue))
        throw new Error('Input must not contain the following characters: ";"');

    allLabels.concat(newLabels).forEach(label => {
        if (label.value === formatedNewLabelValue)
            throw new Error('This label already exists');
    });
};

export const getNewLabel = (
    allLabels: TLabel[],
    newLabels: TLabel[],
    newLabelValue: string
): TLabel => {
    const formatedNewLabelValue = formatNewLabelValue(newLabelValue);
    const takenColors = allLabels.concat(newLabels).map(label => label.color);
    const avilableColors = labelColors.filter(
        label => !takenColors.includes(label)
    );
    const colors = avilableColors.length === 0 ? takenColors : avilableColors;
    const randomNum = Math.floor(Math.random() * colors.length);

    return { value: formatedNewLabelValue, color: colors[randomNum] };
};

export const getWeekdayListForLocale = (locale: string) => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    return [...Array(7).keys()].map(m =>
        formatter.format(new Date(2024, 3, m + 1))
    );
};

export const validateFileSize = (
    files: File[],
    isDemoUser: boolean | undefined
) =>
    files.forEach(file => {
        if (isDemoUser && file.size > DEMO_USER_MAX_FILE_SIZE) {
            throw new FileSizeError();
        }
    });
