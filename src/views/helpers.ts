import { _t, months } from '../constants';

export const getMonth = (num: number, isShort = false) =>
    isShort ? months[num].short : months[num].long;

export const capitalize = (s: string | undefined) =>
    s && s[0].toUpperCase() + s.slice(1);

export const getHMS = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds - (h * 3600 + m * 60));
    return { s, m, h };
};

export const getDuration = (duration: number) => {
    const date = new Date(0);
    date.setSeconds(duration);
    return date.toISOString().substring(11, 19);
};

export const getPace = (
    seconds: number | undefined,
    distance?: number
): string | undefined => {
    if (!seconds || seconds < 0) return;

    const pace = distance ? seconds / distance : seconds;
    const duration = getDuration(pace);
    const split = duration.split(':');

    return `${split[1]}'${split[2]}"`;
};

export const getDateTimeTZ = (timestamp: string | undefined, utcOffset = 0) => {
    if (!timestamp) return;

    const date = new Date(timestamp);
    const h = date.getUTCHours();
    const m = date.getUTCMinutes();
    const s = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();

    if (h === 0 && m === 0 && s === 0 && ms === 0) {
        return date.toLocaleDateString();
    }

    // return date with time adujsted by utcOffset from database, not local time
    const offsetMs = 1000 * 60 * 60 * utcOffset;
    const offsetDate = new Date(date.getTime() + offsetMs);

    return `${offsetDate.toLocaleDateString()}, ${offsetDate
        .toUTCString()
        .slice(17, 22)}`;
};

export const getFormattedMonthAndYear = (
    year: number,
    month: number,
    isShortMonth?: boolean
) => `${getMonth(month - 1, isShortMonth)} ${year}`;
