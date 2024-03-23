import { FC, Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Skeleton, SkeletonList } from '@/components';
import { WorkoutTypes } from '@/interfaces';
import { getEmailFromSession } from '@/server/helpers';
import { getAllWorkouts, getDashboard, getUserId } from '@/server/services';
import { isValidWorkoutType } from '@/utils/helpers';
import { ChartView, StatisticsView, WorkoutListView } from '@/views';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'View your workouts data',
};

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

export default async function Dashboard({
    params,
}: {
    params: { workoutType: string };
}) {
    if (!isValidWorkoutType(params?.workoutType)) {
        notFound();
    }

    const email = getEmailFromSession();
    const userId = await getUserId(email);

    if (!userId) return;

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
