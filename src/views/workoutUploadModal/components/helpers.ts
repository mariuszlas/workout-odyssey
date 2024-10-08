import type { TLabel } from '@/interfaces';

import { FileSizeError } from '../xmlParser';

import { LABEL_COLORS, MAX_FILE_SIZE } from './constants';

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
    const takenColors = allLabels
        .concat(newLabels)
        .map(label => label.background);
    const avilableColors = LABEL_COLORS.filter(
        ({ background }) => !takenColors.includes(background)
    );
    const colors =
        avilableColors.length === 0
            ? allLabels.concat(newLabels)
            : avilableColors;
    const randomNum = Math.floor(Math.random() * colors.length);
    const randomLabel = colors[randomNum];

    return {
        value: formatedNewLabelValue,
        foreground: randomLabel.foreground,
        background: randomLabel.background,
    };
};

export const getWeekdayListForLocale = (locale: string) => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    return [...Array(7).keys()].map(m =>
        formatter.format(new Date(2024, 3, m + 1))
    );
};

export const validateFileSize = (files: File[]) =>
    files.forEach(file => {
        if (file.size > MAX_FILE_SIZE) {
            throw new FileSizeError();
        }
    });
