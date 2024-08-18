import type { HeaderData } from '@/interfaces';
import dayjs from '@/utils/extended-dayjs';
import { getFormattedMonthAndYear } from '@/utils/helpers';

export const getStatsPanelHeading = (
    isPrimary: boolean,
    { year, secStats }: HeaderData,
    isShortMonth?: boolean
): string => {
    if (isPrimary) {
        if (year === 0) return 'Total';
        else return `Year ${year}`;
    } else {
        if (year === 0) return `Year ${secStats}`;
        else return getFormattedMonthAndYear(year, secStats, { isShortMonth });
    }
};

export const formatDurationAsDecimal = (seconds = 0) => {
    const duration = dayjs.duration(seconds, 's');
    return duration.hours() >= 1
        ? duration.asHours().toFixed(1)
        : duration.asMinutes().toFixed(0);
};
