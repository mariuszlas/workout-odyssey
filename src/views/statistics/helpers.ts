import type { HeaderData, WorkoutsDashboard } from '@/interfaces';

export const selectPmStatsData = (
    dashboard: WorkoutsDashboard | undefined,
    yearSelected: number
) => {
    if (yearSelected === 0) return dashboard?.total;

    return dashboard?.years
        ?.filter(yearObj => yearObj.year === yearSelected)
        ?.at(0);
};

export const selectSecStatsData = (
    dashboard: WorkoutsDashboard | undefined,
    { year, secStats }: HeaderData
) => {
    const statsArr =
        year === 0
            ? dashboard?.years?.filter(item => item.year === secStats)
            : dashboard?.months?.filter(
                  item => item.year === year && item.month === secStats
              );

    return statsArr?.at(0);
};
