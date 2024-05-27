import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Navbar } from 'tests/pages/navbar.page';
import { WorkoutPropertiesMenu } from 'tests/pages/workoutPropertiesMenu.page';

import { email, password } from '../testData/user';

test.describe('workout properties menu', () => {
    let navbar: Navbar;
    let workoutProperties: WorkoutPropertiesMenu;

    test.beforeEach(async ({ page, isMobile }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        navbar = new Navbar(page, isMobile);
        workoutProperties = new WorkoutPropertiesMenu(page);
        await workoutProperties.openWorkoutPropertiesMenu();
    });

    test('has 3 menu items', async () => {
        await expect(workoutProperties.menu).toBeVisible();
        await expect(workoutProperties.menuitems).toHaveCount(3);
    });

    test('is closed when properties menu button is clicked again', async () => {
        await workoutProperties.propertiesMenuBtn.click();
        await expect(workoutProperties.menu).not.toBeVisible();
    });

    test('is closed when clicked outside of the menu', async ({ isMobile }) => {
        if (!isMobile) {
            await navbar.logo.click();
            await expect(workoutProperties.menu).not.toBeVisible();
        }
    });
});
