import type { HeaderData } from '@/interfaces';
import dayjs from '@/utils/extended-dayjs';

import { getFormattedMonthAndYear } from '../../helpers';

export const getStatsPanelHeading = (
    isPrimary: boolean,
    { year, secStats }: HeaderData,
    locale: string,
    { yearT, totalT }: { yearT: string; totalT: string },
    isShortMonth?: boolean
): string => {
    if (isPrimary) {
        if (year === 0) return totalT;
        else return `${yearT} ${year}`;
    } else {
        if (year === 0) return `${yearT} ${secStats}`;
        else
            return getFormattedMonthAndYear(
                year,
                secStats,
                locale,
                isShortMonth
            );
    }
};

export const formatDurationAsDecimal = (seconds = 0) => {
    const duration = dayjs.duration(seconds, 's');
    return duration.hours() >= 1
        ? duration.asHours().toFixed(1)
        : duration.asMinutes().toFixed(0);
};
