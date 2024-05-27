import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Modal } from 'tests/pages/modal.page';
import { WorkoutPropertiesMenu } from 'tests/pages/workoutPropertiesMenu.page';

import { email, password } from '../testData/user';

test.describe('workout edit modal', () => {
    let modal: Modal;

    test.beforeEach(async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        const workoutProperties = new WorkoutPropertiesMenu(page);
        await workoutProperties.editWorkout();
        modal = new Modal(page);
    });

    test('is opened', async () => {
        await modal.expectVisible();
    });

    test('has a correct heading', async () => {
        await expect(modal.heading).toHaveText('Edit Workout Data');
    });

    test('is closed by the close icon button in the header', async () => {
        await modal.expectClosedByIcon();
    });
});
