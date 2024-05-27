import { expect, test } from '@playwright/test';
import { Footer } from 'tests/pages/footer.page';
import { HomePage } from 'tests/pages/home.page';
import { Navbar } from 'tests/pages/navbar.page';

test.describe('home page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goTo();
    });

    test.describe('navbar', () => {
        let navbar: Navbar;

        test.beforeEach(async ({ page, isMobile }) => {
            navbar = new Navbar(page, isMobile);
        });

        test('has a logo', async () => {
            await expect(navbar.logo).toBeVisible();
        });

        test('has a sign in link that navigates to login page', async () => {
            await navbar.login();
            await navbar.expectPageToBeLogin();
        });

        test('has a create account link that navigates to sign up page', async () => {
            await navbar.signup();
            await navbar.expectPageToBeSignup();
        });

        test('has a mobile menu that is closed by close button', async ({
            isMobile,
        }) => {
            await navbar.expectMobileMenuClosed();

            if (isMobile) {
                await navbar.openMobileMenu();
                await navbar.expectMobileMenuOpened();
                await navbar.closeMobileMenu();
                await navbar.expectMobileMenuClosed();
            }
        });

        test('has a theme toggle that switches between light and dark themes', async ({
            isMobile,
        }) => {
            if (isMobile) {
                await navbar.openMobileMenu();
            }

            await navbar.execpectLightTheme();
            await navbar.toggleTheme();
            await navbar.execpectDarkTheme();
            await navbar.toggleTheme();
            await navbar.execpectLightTheme();

            if (isMobile) {
                await navbar.expectMobileMenuOpened();
            }
        });
    });

    test.describe('body', () => {
        test('has hero title', async ({ page }) => {
            await expect(page).toHaveTitle(/workout odyssey/i);
        });

        test('has a get started CTA that navigates to login page', async ({
            page,
        }) => {
            await homePage.getStarted();
            await expect(page).toHaveURL('/login');
        });

        test('has 4 main images', async ({ page }) => {
            await expect(page.locator('main').getByRole('img')).toHaveCount(4);
        });
    });

    test.describe('footer', () => {
        test('has a copyright note and a link to GitLab repo', async ({
            page,
        }) => {
            const footer = new Footer(page);
            await expect(footer.copyrightNote).toBeVisible();
            await expect(footer.gitlabLink).toBeVisible();
        });
    });
});
