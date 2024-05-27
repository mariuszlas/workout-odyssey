import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';

import { email, password } from '../testData/user';

test.describe('dashboard', () => {
    let dashboard: DashboardPage;
    const year = new Date().getFullYear();

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
    });

    test("year selector 'next' and 'previous' buttons switch between different years and the total view", async ({
        isMobile,
    }) => {
        await expect(dashboard.primaryStatsTitle).toHaveText('Year 2023');
        await expect(dashboard.secondaryStatsTitle).toHaveText(
            `${isMobile ? 'Dec' : 'December'} 2023`
        );
        await expect(dashboard.workoutListTitle).toHaveText(
            `Workouts in ${isMobile ? 'Dec' : 'December'} 2023`
        );

        await dashboard.goToPreviousYear();
        await expect(dashboard.primaryStatsTitle).toHaveText('Year 2022');
        await expect(dashboard.secondaryStatsTitle).toHaveText(
            `${isMobile ? 'Jul' : 'July'} 2022`
        );
        await expect(dashboard.workoutListTitle).toHaveText(
            `Workouts in ${isMobile ? 'Jul' : 'July'} 2022`
        );

        await dashboard.goToLastYear();
        await expect(dashboard.primaryStatsTitle).toHaveText('Year 2020');
        await expect(dashboard.secondaryStatsTitle).toHaveText(
            `${isMobile ? 'Jun' : 'June'} 2020`
        );
        await expect(dashboard.workoutListTitle).toHaveText(
            `Workouts in ${isMobile ? 'Jun' : 'June'} 2020`
        );

        // try going to the previous year (no more previous years)
        await dashboard.goToPreviousYear();
        await expect(dashboard.primaryStatsTitle).toHaveText('Year 2020');
        await expect(dashboard.secondaryStatsTitle).toHaveText(
            `${isMobile ? 'Jun' : 'June'} 2020`
        );
        await expect(dashboard.workoutListTitle).toHaveText(
            `Workouts in ${isMobile ? 'Jun' : 'June'} 2020`
        );

        await dashboard.goToTotalView();
        await expect(dashboard.primaryStatsTitle).toHaveText('Total');
        await expect(dashboard.secondaryStatsTitle).toHaveText(`Year ${year}`);
        await expect(dashboard.workoutListTitle).toHaveText(
            'Workouts This Month'
        );

        // go to the next year (no more years beyond total view)
        await dashboard.goToNextYear();
        await expect(dashboard.primaryStatsTitle).toHaveText('Total');
        await expect(dashboard.secondaryStatsTitle).toHaveText(`Year ${year}`);
        await expect(dashboard.workoutListTitle).toHaveText(
            'Workouts This Month'
        );
    });

    test('year selector dropdown selector switches between different years and the total view', async ({
        isMobile,
    }) => {
        // select the last year
        await dashboard.selectYear('2020');
        await expect(dashboard.primaryStatsTitle).toHaveText('Year 2020');
        await expect(dashboard.secondaryStatsTitle).toHaveText(
            `${isMobile ? 'Jun' : 'June'} 2020`
        );
        await expect(dashboard.workoutListTitle).toHaveText(
            `Workouts in ${isMobile ? 'Jun' : 'June'} 2020`
        );

        // select one of the years
        await dashboard.selectYear('2023');
        await expect(dashboard.primaryStatsTitle).toHaveText('Year 2023');
        await expect(dashboard.secondaryStatsTitle).toHaveText(
            `${isMobile ? 'Dec' : 'December'} 2023`
        );
        await expect(dashboard.workoutListTitle).toHaveText(
            `Workouts in ${isMobile ? 'Dec' : 'December'} 2023`
        );

        // select the total view
        await dashboard.selectYear('Total');
        await expect(dashboard.primaryStatsTitle).toHaveText('Total');
        await expect(dashboard.secondaryStatsTitle).toHaveText(`Year ${year}`);
        await expect(dashboard.workoutListTitle).toHaveText(
            'Workouts This Month'
        );
    });
});
