import { _t, labelColors } from '@/constants';
import type { TLabel } from '@/interfaces';

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
        throw new Error(_t.errorLabelInputLength);

    if (/;/g.test(formatedNewLabelValue))
        throw new Error(_t.errorLabelInputBadChar);

    allLabels.concat(newLabels).forEach(label => {
        if (label.value === formatedNewLabelValue)
            throw new Error(_t.errorLabelDuplicate);
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
