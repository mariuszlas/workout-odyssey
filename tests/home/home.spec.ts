import { expect, test } from '@playwright/test';

test.describe('landing page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.describe('body', () => {
        test('has hero title ', async ({ page }) => {
            await expect(page).toHaveTitle(/Workout Odyssey/);
        });

        test('has a get started CTA that navigates to login page ', async ({
            page,
        }) => {
            await page.getByRole('button', { name: 'Get Started' }).click();
            await expect(page).toHaveURL('/login');
        });

        test('has 4 main images ', async ({ page }) => {
            await expect(page.locator('main').getByRole('img')).toHaveCount(4);
        });
    });

    test.describe('navbar', () => {
        test('has a logo link ', async ({ page }) => {
            await page
                .getByRole('navigation')
                .getByRole('link', { name: /Workout Odyssey/ })
                .click();
            await expect(page).toHaveURL('/');
        });

        test('has a sign in link that navigates to login page ', async ({
            page,
            isMobile,
        }) => {
            if (isMobile) {
                await page.getByLabel('Main menu').click();
                const mainMenu = page.getByTestId('drawer-container');

                await expect(mainMenu).toBeVisible();

                await mainMenu
                    .getByRole('menuitem', { name: 'Sign In' })
                    .click();

                await expect(mainMenu).not.toBeVisible();
                await expect(page).toHaveURL('/login');
            } else {
                await page
                    .getByRole('navigation')
                    .getByRole('link', { name: 'Sign In' })
                    .click();

                await expect(page).toHaveURL('/login');
            }
        });

        test('has a create account link that navigates to sign up page ', async ({
            page,
            isMobile,
        }) => {
            if (isMobile) {
                await page.getByLabel('Main menu').click();
                const mainMenu = page.getByTestId('drawer-container');

                await expect(mainMenu).toBeVisible();

                await mainMenu
                    .getByRole('menuitem', { name: 'Create Account' })
                    .click();

                await expect(mainMenu).not.toBeVisible();
                await expect(page).toHaveURL('/signup');
            } else {
                await page
                    .getByRole('navigation')
                    .getByRole('link', { name: 'Create Account' })
                    .click();

                await expect(page).toHaveURL('/signup');
            }
        });

        test('has a theme toggle that switches between light and dark themes ', async ({
            page,
            isMobile,
        }) => {
            const html = page.locator('html');

            if (isMobile) {
                await page.getByLabel('Main menu').click();
                const mainMenu = page.getByTestId('drawer-container');
                const themeSwith = page
                    .getByRole('menu')
                    .getByLabel('theme switch');

                await expect(mainMenu).toBeVisible();
                await expect(html).toHaveAttribute('data-theme', 'light');

                await themeSwith.click();
                await expect(mainMenu).toBeVisible();
                await expect(html).toHaveAttribute('data-theme', 'dark');

                await themeSwith.click();
                await expect(mainMenu).toBeVisible();
                await expect(html).toHaveAttribute('data-theme', 'light');

                await mainMenu.getByLabel('close').click();
                await expect(mainMenu).not.toBeVisible();
            } else {
                const themeSwith = page
                    .getByRole('navigation')
                    .getByLabel('theme switch');

                await expect(themeSwith).toBeVisible();
                await expect(html).toHaveAttribute('data-theme', 'light');

                await themeSwith.click();
                await expect(html).toHaveAttribute('data-theme', 'dark');

                await page.reload();
                await expect(html).toHaveAttribute('data-theme', 'dark');

                await themeSwith.click();
                await expect(html).toHaveAttribute('data-theme', 'light');

                await page.reload();
                await expect(html).toHaveAttribute('data-theme', 'light');
            }
        });
    });

    test.describe('footer', () => {
        test('has a copyright note and a link to GitLab ', async ({ page }) => {
            await expect(page.getByTestId('copyright-note')).toBeVisible();
            await expect(
                page.getByLabel("Visit the project's GitLab page")
            ).toBeVisible();
        });
    });
});
