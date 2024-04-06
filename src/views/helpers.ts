import dayjs from '@/utils/extended-dayjs';

import { _t, months } from '../constants';

export const getMonth = (num: number, isShort = false) =>
    isShort ? months[num].short : months[num].long;

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
    isShortMonth?: boolean
) => `${getMonth(month - 1, isShortMonth)} ${year}`;
