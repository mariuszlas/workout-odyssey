import dayjs from '@/utils/extended-dayjs';

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
