import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Navbar } from 'tests/pages/navbar.page';
import { WorkoutSelector } from 'tests/pages/workoutSelector.page';

import { email, password } from '../testData/user';

test.describe('workout selector', () => {
    let dashboard: DashboardPage;
    let navbar: Navbar;
    let workoutSelector: WorkoutSelector;

    test.beforeEach(async ({ page, isMobile }) => {
        dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        navbar = new Navbar(page, isMobile);
        workoutSelector = new WorkoutSelector(page);
    });

    test('opens up the workout selector which should have workout type options', async ({
        isMobile,
    }) => {
        if (isMobile) {
            await dashboard.expectPageToBeDashboardRunning();
            await navbar.openMobileMenu();
            await workoutSelector.expectThreeWorkoutOptions();
        } else {
            await expect(navbar.workoutSelectorBtn).toHaveText(/running/);
            await navbar.workoutSelectorBtn.click();
            await workoutSelector.expectTwoWorkoutOptions();
        }
    });

    test('changes workout type', async ({ isMobile }) => {
        await dashboard.expectPageToBeDashboardRunning();

        if (isMobile) {
            await navbar.openMobileMenu();
            await workoutSelector.walkingOption.click();
            await dashboard.expectPageToBeDashboardWalking();
            await navbar.expectMobileMenuClosed();
        } else {
            await navbar.workoutSelectorBtn.click();
            await workoutSelector.walkingOption.click();
            await dashboard.expectPageToBeDashboardWalking();
            await expect(workoutSelector.menu).not.toBeVisible();
        }
    });

    test('is closed by clicking workout menu button on desktop', async ({
        isMobile,
    }) => {
        if (!isMobile) {
            await navbar.workoutSelectorBtn.click();
            await expect(workoutSelector.menu).toBeVisible();
            await navbar.workoutSelectorBtn.click();
            await expect(workoutSelector.menu).not.toBeVisible();
        }
    });

    test('is closed when clicked outside of the menu on desktop', async ({
        isMobile,
    }) => {
        if (!isMobile) {
            await navbar.workoutSelectorBtn.click();
            await expect(workoutSelector.menu).toBeVisible();
            await navbar.logo.click();
            await expect(workoutSelector.menu).not.toBeVisible();
        }
    });
});
