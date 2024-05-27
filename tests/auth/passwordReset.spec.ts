import { expect, test } from '@playwright/test';
import { Navbar } from 'tests/pages/navbar.page';
import { PasswordResetPage } from 'tests/pages/passwordReset.page';

test.describe('password reset page', () => {
    let passwordResetPage: PasswordResetPage;

    test.beforeEach(async ({ page }) => {
        passwordResetPage = new PasswordResetPage(page);
        await passwordResetPage.goTo();
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

        test('has a sign in link that navigates to login page', async () => {
            await navbar.login();
            await navbar.expectPageToBeLogin();
        });

        test('has a create account link that navigates to sign up page', async () => {
            await navbar.signup();
            await navbar.expectPageToBeSignup();
        });

        test('has a theme switch', async () => {
            await navbar.expectThemeToggleToBeVisible();
        });
    });

    test.describe('body', () => {
        test('has a correct heading', async () => {
            await expect(passwordResetPage.heading).toHaveText(
                'Password Reset'
            );
        });

        test('sends a request for new password and switches to the password reset form', async () => {
            await passwordResetPage.fillEmail('jon@email.com');
            await passwordResetPage.requestPasswordReset();
            await expect(passwordResetPage.heading).toHaveText(
                'Password Reset'
            );
            await expect(passwordResetPage.codeInput).toBeVisible();
            await expect(passwordResetPage.newPasswordInput).toBeVisible();
            await expect(
                passwordResetPage.confirmNewPasswordInput
            ).toBeVisible();
            await expect(passwordResetPage.resetPassowordCta).toBeVisible();
            await expect(passwordResetPage.noResetCodeCta).toBeVisible();
        });
    });
});
