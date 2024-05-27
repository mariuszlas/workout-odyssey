import { expect, test } from '@playwright/test';
import { EmailVerificationPage } from 'tests/pages/emailVerification.page';
import { Navbar } from 'tests/pages/navbar.page';

test.describe('email verification page', () => {
    let emailVerificationPage: EmailVerificationPage;

    test.beforeEach(async ({ page }) => {
        emailVerificationPage = new EmailVerificationPage(page);
        await emailVerificationPage.goTo();
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

    test.describe('body', () => {
        test('has a correct heading', async () => {
            await expect(emailVerificationPage.heading).toHaveText(
                'Email Verification'
            );
        });

        test('has decoded user email', async () => {
            await expect(emailVerificationPage.verificationEmail).toHaveText(
                'jon@email.com'
            );
        });

        test('has a sign in CTA that navigates to login page on click', async ({
            page,
        }) => {
            await emailVerificationPage.signIn();
            await expect(page).toHaveURL('/login');
        });

        test('has a resend email CTA', async () => {
            await expect(emailVerificationPage.resendEmailCta).toBeVisible();
        });
    });
});
