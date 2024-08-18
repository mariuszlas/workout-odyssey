import { Button, H1 } from '@/components';

import HomePageImages from './homePageImages';

export async function generateMetadata() {
    return {
        title: 'Workout Odyssey',
        description:
            'Track your running, walking, and cycling workouts with ease! Workout Odyssey lets you log workouts, upload .tcx files including location data, view workout stats, and see your progress over time.',
    };
}

export default function HomePage() {
    return (
        <main className="flex flex-col items-center gap-10 p-4 sm:p-10 lg:gap-20">
            <H1>Workout Odyssey - where all your fintess data is stored!</H1>
            <Button asChild size="hero">
                <a href="/dashboard/running">Get Started</a>
            </Button>
            <HomePageImages />
        </main>
    );
}
