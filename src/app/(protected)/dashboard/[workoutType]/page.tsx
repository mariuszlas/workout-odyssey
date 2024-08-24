import { FC, Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { WorkoutTypes } from '@/interfaces';
import { getAllWorkouts, getDashboard } from '@/server/services';
import { capitalize, isValidWorkoutType } from '@/utils/helpers';
import { ChartView, StatisticsView, WorkoutListView } from '@/views';

type Params = { params: { workoutType: string } };

export async function generateMetadata({ params: { workoutType } }: Params) {
    return {
        title: `Dashboard | ${capitalize(workoutType)}`,
        description: 'View your workouts data',
    };
}

interface Props {
    workoutType: WorkoutTypes;
    userId: string | null;
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

    const { userId } = auth();

    return (
        <div className="mx-auto grid w-full max-w-8xl grid-cols-12 gap-4 p-4">
            <div className="col-span-12 flex flex-col gap-4 lg:col-span-6 xl:col-span-7">
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
        </div>
    );
}
