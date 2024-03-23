import { _t } from '@/constants';
import type { HeaderData } from '@/interfaces';

import { getFormattedMonthAndYear } from '../../helpers';

export const getStatsPanelHeading = (
    isPrimary: boolean,
    { year, secStats }: HeaderData,
    isShortMonth?: boolean
): string => {
    if (isPrimary) {
        if (year === 0) return _t.total;
        else return `${_t.year} ${year}`;
    } else {
        if (year === 0) return `${_t.year} ${secStats}`;
        else return getFormattedMonthAndYear(year, secStats, isShortMonth);
    }
};

export const getDecimal = (
    seconds: number | undefined
): { time: string; unit: string } | undefined => {
    if (!seconds || seconds < 0) return;
    const hd = seconds / 3600;

    if (hd >= 1.0) return { time: hd.toFixed(1), unit: _t.h };
    else return { time: (hd * 60).toFixed(0), unit: _t.m };
};
