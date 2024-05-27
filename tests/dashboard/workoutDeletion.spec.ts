import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Modal } from 'tests/pages/modal.page';
import { WorkoutPropertiesMenu } from 'tests/pages/workoutPropertiesMenu.page';

import { email, password } from '../testData/user';

test.describe('workout deletion modal', () => {
    let modal: Modal;

    test.beforeEach(async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        const workoutProperties = new WorkoutPropertiesMenu(page);
        await workoutProperties.delete();
        modal = new Modal(page);
    });

    test('is opened', async () => {
        await modal.expectVisible();
    });

    test('has a correct heading', async () => {
        await expect(modal.heading).toHaveText('Workout Deletion');
    });

    test('is closed by the close icon button in the header', async () => {
        await modal.expectClosedByIcon();
    });

    test('is closed by the cancel button in the footer', async () => {
        await modal.expectClosedByCancelButton();
    });
});
