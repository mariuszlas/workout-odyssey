import { FC, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { LocaleParam, WorkoutTypes } from '@/interfaces';
import {
    getAllWorkouts,
    getCurrentUserId,
    getDashboard,
} from '@/server/services';
import { capitalize, isValidWorkoutType } from '@/utils/helpers';
import { ChartView, StatisticsView, WorkoutListView } from '@/views';

type Params = { params: { workoutType: string } };

export async function generateMetadata({
    params: { locale, workoutType },
}: LocaleParam & Params) {
    const t = await getTranslations({ locale });

    return {
        title: `${t('Metadata.Dashboard.title')} | ${capitalize(t('Dashboard.workoutType', { workoutType }))}`,
        description: t('Metadata.Dashboard.description'),
    };
}

interface Props {
    workoutType: WorkoutTypes;
    userId: string;
}

const WorkoutListStream: FC<Props> = async ({ workoutType, userId }) => {
    const data = await getAllWorkouts(workoutType, userId);
    return <WorkoutListView data={data} />;
};

const ChartAndStatsStream: FC<Props> = async ({ workoutType, userId }) => {
    const dashboard = await getDashboard(workoutType, userId);
    return (
        <>
            <ChartView dashboard={dashboard} />
            <StatisticsView dashboard={dashboard} />
        </>
    );
};

export default async function Dashboard({ params }: Params) {
    if (!isValidWorkoutType(params?.workoutType)) notFound();
    const userId = await getCurrentUserId();

    return (
        <main className="mx-auto grid w-full max-w-8xl grid-cols-12 gap-6 p-4 sm:p-6">
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-6 xl:col-span-7">
                <Suspense
                    fallback={
                        <>
                            <ChartView isLoading />
                            <StatisticsView isLoading />
                        </>
                    }
                >
                    <ChartAndStatsStream
                        workoutType={params.workoutType}
                        userId={userId}
                    />
                </Suspense>
            </div>
            <div className="col-span-12 lg:col-span-6 xl:col-span-5">
                <Suspense fallback={<WorkoutListView isLoading />}>
                    <WorkoutListStream
                        workoutType={params.workoutType}
                        userId={userId}
                    />
                </Suspense>
            </div>
        </main>
    );
}
