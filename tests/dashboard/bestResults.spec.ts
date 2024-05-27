import { expect, test } from '@playwright/test';
import { BestResults } from 'tests/pages/bestResults.page';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Modal } from 'tests/pages/modal.page';
import { Navbar } from 'tests/pages/navbar.page';
import { UserMenu } from 'tests/pages/userMenu.page';

import { email, password } from '../testData/user';

test.describe('best results modal', () => {
    let bestResults: BestResults;
    let modal: Modal;

    test.beforeEach(async ({ page, isMobile }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        const navbar = new Navbar(page, isMobile);
        await navbar.userMenuBtn.click();
        const userMenu = new UserMenu(page);
        await userMenu.openBestResults();
        modal = new Modal(page);
        bestResults = new BestResults(page);
    });

    test('is opened', async () => {
        await modal.expectVisible();
    });

    test('has a correct heading', async () => {
        await expect(modal.heading).toHaveText('Best Results for running');
    });

    test('is closed by the close icon button in the header', async () => {
        await modal.expectClosedByIcon();
    });

    test('is closed by the close button in the footer', async () => {
        await modal.expectClosedByCloseButton();
    });

    test('has 5 workout records', async () => {
        await expect(bestResults.items).toHaveCount(5);
    });
});
