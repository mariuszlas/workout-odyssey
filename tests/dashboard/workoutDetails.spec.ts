import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { WorkoutDetails } from 'tests/pages/workoutDetails.page';
import { WorkoutPropertiesMenu } from 'tests/pages/workoutPropertiesMenu.page';

import { email, password } from '../testData/user';

test.describe('workout details', () => {
    let workoutDetails: WorkoutDetails;

    test.beforeEach(async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        const workoutProperties = new WorkoutPropertiesMenu(page);
        await workoutProperties.openDetails();
        workoutDetails = new WorkoutDetails(page);
    });

    test('is opened', async () => {
        await workoutDetails.expectVisible();
    });

    test('has a correct heading', async () => {
        await expect(workoutDetails.heading).toHaveText('Workout Details');
    });

    test('is closed by the close icon button in the header', async () => {
        await workoutDetails.expectClosedByIcon();
    });

    test('has six workout detail items', async () => {
        await expect(workoutDetails.items).toHaveCount(6);
        await expect(workoutDetails.map).not.toBeVisible();
    });
});
