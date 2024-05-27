import { expect, test } from '@playwright/test';
import { LoginPage } from 'tests/pages/login.page';
import { Navbar } from 'tests/pages/navbar.page';
import { email, password } from 'tests/testData/user';

test.describe('login page', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    });

    test.describe('navbar', () => {
        let navbar: Navbar;

        test.beforeEach(async ({ page, isMobile }) => {
            navbar = new Navbar(page, isMobile);
        });

        test('has a logo link that navigates to home page', async () => {
            await navbar.logo.click();
            await navbar.expectPageToBeHome();
        });

        test('has a create account link that navigates to sign up page', async () => {
            await navbar.signup();
            await navbar.expectPageToBeSignup();
        });

        test('has a theme switch', async () => {
            await navbar.expectThemeToggleToBeVisible();
        });
    });

    test.describe('form', () => {
        test('has a correct heading', async () => {
            await expect(loginPage.heading).toHaveText('Sign In');
        });

        test('has a sign up link and navigates to signup page on click', async ({
            page,
        }) => {
            await loginPage.signup();
            await expect(page).toHaveURL('/signup');
        });

        test('has a forgot password link and navigates to password recovery page on click', async ({
            page,
        }) => {
            await loginPage.resetPassword();
            await expect(page).toHaveURL('/password-reset');
        });

        test('password input toggles password visibility', async () => {
            await loginPage.fillPassword(password);
            await loginPage.expectPasswordHidden();
            await loginPage.togglePasswordVisibility();
            await loginPage.expectPasswordVisible();
            await loginPage.togglePasswordVisibility();
            await loginPage.expectPasswordHidden();
        });

        test('logs in the user and redirects to dashboard page', async ({
            page,
        }) => {
            await loginPage.fillEmail(email);
            await loginPage.fillPassword(password);
            await loginPage.signIn();
            await expect(page).toHaveURL('/dashboard/running');
        });
    });
});
