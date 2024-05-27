import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Navbar } from 'tests/pages/navbar.page';

import { email, password } from '../testData/user';

test.describe('dashboard', () => {
    let dashboard: DashboardPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
    });

    test.describe('navbar', () => {
        let navbar: Navbar;

        test.beforeEach(async ({ page, isMobile }) => {
            navbar = new Navbar(page, isMobile);
        });

        test('has a logo', async () => {
            await expect(navbar.logo).toBeVisible();
        });

        test('has user menu button', async () => {
            await expect(navbar.userMenuBtn).toBeVisible();
        });

        test('has a theme switch', async () => {
            await navbar.expectThemeToggleToBeVisible();
        });

        test('has a new workout button', async ({ isMobile }) => {
            if (isMobile) {
                await expect(navbar.mobileNewWorkoutBtn).toBeVisible();
                await expect(navbar.newWorkoutBtn).not.toBeVisible();
            } else {
                await expect(navbar.newWorkoutBtn).toBeVisible();
                await expect(navbar.mobileNewWorkoutBtn).not.toBeVisible();
            }
        });

        test('has a workout selector button on desktop', async ({
            isMobile,
        }) => {
            if (isMobile) {
                await expect(navbar.workoutSelectorBtn).not.toBeVisible();
            } else {
                await expect(navbar.workoutSelectorBtn).toBeVisible();
            }
        });
    });

    test.describe('body', () => {
        test('has a chart section with correct header', async () => {
            await expect(dashboard.chartSection).toBeVisible();
            await expect(dashboard.chartHeading).toHaveText('Overview');
            await expect(dashboard.chartYearSelector).toBeVisible();
        });
    });
});
