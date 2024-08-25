import {
    type BestMonths,
    ChartDataTypes,
    type MonthStats,
    type WorkoutsDashboard,
} from '@/interfaces';
import { formatDurationAsHour, getMonthForLocale } from '@/utils/helpers';

export const getSecStats = (
    year: number,
    bestMonths: BestMonths | undefined
) => {
    const now = new Date();
    const [currYear, currMonth] = [now.getFullYear(), now.getMonth() + 1];
    const isTotal = year === 0;
    const isCurrentYearSelected = year === currYear;

    let secStats;
    if (isTotal) {
        secStats = currYear;
    } else if (isCurrentYearSelected) {
        secStats = currMonth;
    } else {
        secStats = bestMonths?.[year.toString()]?.month ?? currMonth;
    }
    return secStats;
};

export const getNextYearIdx = (currIdx: number) =>
    currIdx - 1 < 0 ? 0 : currIdx - 1;

export const getPreviousYearIdx = (currIdx: number, arrLength: number) =>
    currIdx + 1 >= arrLength ? currIdx : currIdx + 1;

export const findBestMonths = (dashboard: WorkoutsDashboard) => {
    const bestMonths: Record<string, MonthStats> = {};

    dashboard?.months?.forEach(monthObj => {
        const year = monthObj.year.toString();

        if (year in bestMonths) {
            const currMonth = bestMonths[year];
            const currDistance = currMonth.distance;

            if (currDistance < monthObj.distance) {
                bestMonths[year] = monthObj;
            }
        } else {
            bestMonths[year] = monthObj;
        }
    });

    return bestMonths;
};

export const getAvailableYears = (dashboard: WorkoutsDashboard) =>
    dashboard?.years?.map(yearObj => yearObj.year).reverse() ?? [];

const getChartDataValue = (data: number, dataType: ChartDataTypes) => {
    if (dataType === ChartDataTypes.DURATION) {
        return formatDurationAsHour(data);
    }
    return data;
};

export const selectChartData = (
    dashboard: WorkoutsDashboard | undefined,
    yearSelected: number,
    dataType: ChartDataTypes
) => {
    if (!dashboard?.years || !dashboard.months) return [];

    if (yearSelected === 0)
        return dashboard.years.map(yearObj => ({
            x: yearObj.year.toString(),
            y: getChartDataValue(yearObj[dataType], dataType),
            value: yearObj.year,
        }));

    return dashboard.months
        .filter(monthObj => monthObj.year === yearSelected)
        .map(monthObj => ({
            x: getMonthForLocale(monthObj.month - 1, { isShortMonth: true }),
            y: getChartDataValue(monthObj[dataType], dataType),
            value: monthObj.month,
        }));
};
