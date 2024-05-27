import { expect, test } from '@playwright/test';
import { DashboardPage } from 'tests/pages/dashboard.page';
import { Navbar } from 'tests/pages/navbar.page';
import { UserMenu } from 'tests/pages/userMenu.page';

import { email, password } from '../testData/user';

test.describe('user menu', () => {
    let navbar: Navbar;
    let userMenu: UserMenu;

    test.beforeEach(async ({ page, isMobile }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        navbar = new Navbar(page, isMobile);
        await navbar.userMenuBtn.click();
        userMenu = new UserMenu(page);
    });

    test('has the user name and email', async () => {
        await expect(userMenu.menu).toBeVisible();
        await expect(userMenu.heading).toHaveText('Bob');
        await expect(userMenu.userEmail).toHaveText('jon@email.com');
        await expect(userMenu.menuitems).toHaveCount(3);
    });

    test('has the best results button that opens up the best results modal', async ({
        page,
    }) => {
        await userMenu.openBestResults();
        await expect(
            page.getByTestId('modal-container').getByRole('dialog')
        ).toBeVisible();
    });

    test('has the account settings link that navigates to the account settings page', async ({
        page,
    }) => {
        await userMenu.openAccountSettings();
        await expect(page).toHaveURL('/user');
    });

    test('has the sign out button that logs the user out and navigates to the login page', async ({
        page,
    }) => {
        await userMenu.signout();
        await expect(page).toHaveURL('/login');
    });

    test('is closed when clicked on the account menu button again', async () => {
        await expect(userMenu.menu).toBeVisible();
        await navbar.userMenuBtn.click();
        await expect(userMenu.menu).not.toBeVisible();
    });

    test('is closed when clicked outside of the menu', async ({ isMobile }) => {
        if (!isMobile) {
            await expect(userMenu.menu).toBeVisible();
            await navbar.logo.click();
            await expect(userMenu.menu).not.toBeVisible();
        }
    });
});
