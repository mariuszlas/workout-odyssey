import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Modal } from 'tests/pages/modal.page';
import { Navbar } from 'tests/pages/navbar.page';

import { email, password } from '../testData/user';

test.describe('workout upload modal', () => {
    let modal: Modal;

    test.beforeEach(async ({ page, isMobile }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        const navbar = new Navbar(page, isMobile);
        await navbar.addNewWorkout();
        modal = new Modal(page);
    });

    test('is opened', async () => {
        await modal.expectVisible();
    });

    test('has a correct heading', async () => {
        await expect(modal.heading).toHaveText('Workout Upload');
    });

    test('is closed by the close icon button in the header', async () => {
        await modal.expectClosedByIcon();
    });
});
