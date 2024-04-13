import { FC, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Skeleton, SkeletonList } from '@/components';
import { LocaleParam, WorkoutTypes } from '@/interfaces';
import {
    getAllWorkouts,
    getCurrentUserId,
    getDashboard,
} from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';
import { ChartView, StatisticsView, WorkoutListView } from '@/views';
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

interface StreamProps {
    workoutType: WorkoutTypes;
    userId: number;
}

const WorkoutListStream: FC<StreamProps> = async ({ workoutType, userId }) => {
    const data = await getAllWorkouts(workoutType, userId);
    return <WorkoutListView data={data} />;
};

const ChartAndStatsStream: FC<StreamProps> = async ({
    workoutType,
    userId,
}) => {
    const dashboard = await getDashboard(workoutType, userId);
    return (
        <>
            <ChartView dashboard={dashboard} />
            <StatisticsView dashboard={dashboard} />
        </>
    );
};

const ChartAndStatsSkeleton = () => (
    <>
        <section className="flex aspect-[3/2] flex-col items-center gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg">
            <Skeleton h={'full'} />
        </section>

        <div className="mt-4 grid h-80 w-full grid-cols-2 gap-6">
            <section className="flex flex-col items-start gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg">
                <Skeleton h={'full'} />
            </section>
            <section className="flex flex-col items-start gap-2 border-base-content border-opacity-20 p-4 sm:gap-4 sm:rounded-xl sm:border sm:p-6 sm:shadow-lg">
                <Skeleton h={'full'} />
            </section>
        </div>
    </>
);

export default async function Dashboard({ params }: Params) {
    if (!isValidWorkoutType(params?.workoutType)) notFound();

    const userId = await getCurrentUserId();

    return (
        <main className="flex justify-center align-middle">
            <div className="grid w-full max-w-8xl grid-cols-12 sm:gap-4 sm:px-8 sm:py-4">
                <div className="col-span-12 lg:col-span-6 xl:col-span-7">
                    <Suspense fallback={<ChartAndStatsSkeleton />}>
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
                        <Suspense fallback={<SkeletonList length={8} />}>
                            <WorkoutListStream
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
