import { FC, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SkeletonList } from '@/components';
import { LocaleParam, WorkoutTypes } from '@/interfaces';
import {
    getAllWorkouts,
    getCurrentUserId,
    getDashboard,
} from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';
import { ChartView, StatisticsView, WorkoutListBase } from '@/views';
import { capitalize } from '@/views/helpers';

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
    userId: number;
}

const WorkoutListView: FC<Props> = async ({ workoutType, userId }) => {
    const data = await getAllWorkouts(workoutType, userId);
    return <WorkoutListBase data={data} />;
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
        <main className="flex justify-center align-middle">
            <div className="grid w-full max-w-8xl grid-cols-12 sm:gap-4 sm:px-8 sm:py-4">
                <div className="col-span-12 lg:col-span-6 xl:col-span-7">
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
                    <section
                        className="flex flex-col items-start gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg lg:min-h-full"
                        data-testid="workout-list-section"
                    >
                        <Suspense fallback={<SkeletonList length={4} h={14} />}>
                            <WorkoutListView
                                workoutType={params.workoutType}
                                userId={userId}
                            />
                        </Suspense>
                    </section>
                </div>
            </div>
        </main>
    );
}
