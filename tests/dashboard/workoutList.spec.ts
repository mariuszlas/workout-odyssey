import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { WorkoutList } from 'tests/pages/workoutList.page';

import { email, password } from '../testData/user';

test.describe('workout list', () => {
    let dashboard: DashboardPage;
    let workoutList: WorkoutList;

    test.beforeEach(async ({ page, isMobile }) => {
        dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        workoutList = new WorkoutList(page, isMobile);
    });

    test('switches between all workout and monthly workout list views', async ({
        isMobile,
    }) => {
        await expect(workoutList.heading).toHaveText(
            `Workouts in ${isMobile ? 'Dec' : 'December'} 2023`
        );
        await expect(workoutList.workouts).toHaveCount(10);

        await dashboard.selectYear('Total');

        await expect(workoutList.workouts).toHaveCount(0);
        await expect(workoutList.heading).toHaveText('Workouts This Month');
        await expect(workoutList.noWorkoutsMsg).toBeVisible();

        // toggle all workouts view
        await workoutList.togglAllWorkouts();
        await expect(workoutList.workouts).toHaveCount(10);
        await expect(workoutList.heading).toHaveText('All Training Records');

        // toggle default monthly view again
        await workoutList.togglAllWorkouts(true);
        await expect(workoutList.workouts).toHaveCount(0);
        await expect(workoutList.heading).toHaveText('Workouts This Month');
        await expect(workoutList.noWorkoutsMsg).toBeVisible();
    });

    test('shows 10 workout records on page 1 and 2 records on page 2 and switches between monthly pages', async () => {
        await dashboard.selectYear('2023');
        await expect(workoutList.workouts).toHaveCount(10);

        // switch to the second page of current month workouts
        await workoutList.secondPageBtn.click();
        await expect(workoutList.workouts).toHaveCount(2);

        // show the first page of current month workouts again
        await workoutList.firstPageBtn.click();
        await expect(workoutList.workouts).toHaveCount(10);
    });

    test('shows 10 workout records on page 1 and 9 records on the last page', async () => {
        await workoutList.togglAllWorkouts();
        await expect(workoutList.workouts).toHaveCount(10);

        // go the third page (last one)
        await workoutList.thirdPageBtn.click();
        await expect(workoutList.workouts).toHaveCount(9);

        // go back to the first page
        await workoutList.firstPageBtn.click();
        await expect(workoutList.workouts).toHaveCount(10);
    });
});
