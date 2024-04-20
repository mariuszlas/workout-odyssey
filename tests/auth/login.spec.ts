import { expect, test } from '@playwright/test';

const email = 'bob@test.com';
const password = 'Password1';

test.describe('login page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test.describe('navbar', () => {
        test('has a theme toggle that switches between light and dark themes ', async ({
            page,
            isMobile,
        }) => {
            if (isMobile) {
                await page.getByLabel('Main menu').click();
                const mainMenu = page.getByTestId('drawer-container');
                const themeSwith = page
                    .getByRole('menu')
                    .getByLabel('theme switch');

                await expect(mainMenu).toBeVisible();
                await expect(themeSwith).toBeVisible();
            } else {
                const themeSwith = page
                    .getByRole('navigation')
                    .getByLabel('theme switch');

                await expect(themeSwith).toBeVisible();
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
    });

    test.describe('form', () => {
        test('has a sign up link and navigates to signup page on click', async ({
            page,
        }) => {
            await page
                .getByTestId('login-form')
                .getByRole('link', { name: 'Sign up' })
                .click();
            await expect(page).toHaveURL('/signup');
        });

        test('has a forgot password link and navigates to password recovery page on click', async ({
            page,
        }) => {
            await page
                .getByTestId('login-form')
                .getByRole('link', { name: 'Forgot Password?' })
                .click();
            await expect(page).toHaveURL('/password-reset');
        });

        test('password input toggles password visibility', async ({ page }) => {
            const passwordInput = page.getByLabel('Password', { exact: true });
            const togglePasswordBtn = page.getByLabel(
                'toggle password visibility'
            );

            await passwordInput.fill(password);
            await expect(passwordInput).toHaveAttribute('type', 'password');

            await togglePasswordBtn.click();
            await expect(passwordInput).toHaveAttribute('type', 'text');

            await togglePasswordBtn.click();
            await expect(passwordInput).toHaveAttribute('type', 'password');
        });

        test('logs in the user and redirects to dashboard page', async ({
            page,
        }) => {
            await page.getByLabel('Email').fill(email);
            await page.getByLabel('Password', { exact: true }).fill(password);

            await page.getByRole('button', { name: 'Sign In' }).click();

            await expect(page).toHaveURL('/dashboard/running');
        });
    });
});
