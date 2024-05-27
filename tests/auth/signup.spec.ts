import { expect, test } from '@playwright/test';
import { Navbar } from 'tests/pages/navbar.page';
import { SignupPage } from 'tests/pages/signup.page';
import { password } from 'tests/testData/user';

const name = 'jon';
const email = 'jon@email.com';

test.describe('signup page', () => {
    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        await signupPage.goTo();
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

        test('has a theme switch', async () => {
            await navbar.expectThemeToggleToBeVisible();
        });
    });

    test.describe('form', () => {
        test('has a correct heading', async () => {
            await expect(signupPage.heading).toHaveText('Sign Up');
        });

        test('has a sign in link and navigates to login page on click', async ({
            page,
        }) => {
            await signupPage.signIn();
            await expect(page).toHaveURL('/login');
        });

        test('password input toggles password visibility', async () => {
            await signupPage.fillPassword(password);
            await signupPage.fillConfirmPassword(password);

            await signupPage.expectPasswordHidden();
            await signupPage.togglePasswordVisibility();
            await signupPage.expectPasswordVisible();
            await signupPage.togglePasswordVisibility();
            await signupPage.expectPasswordHidden();

            await signupPage.expectConfirmPasswordHidden();
            await signupPage.toggleConfirmPasswordVisibility();
            await signupPage.expectConfirmPasswordVisible();
            await signupPage.toggleConfirmPasswordVisibility();
            await signupPage.expectConfirmPasswordHidden();
        });

        test('logs in the user and redirects to dashboard page', async ({
            page,
            isMobile,
            browserName,
        }) => {
            test.skip(
                browserName !== 'chromium' || isMobile,
                'skip other browser due to user being added to database'
            );

            await signupPage.fillName(name);
            await signupPage.fillEmail(email);
            await signupPage.fillPassword(password);
            await signupPage.fillConfirmPassword(password);
            await signupPage.signUp();
            await expect(page).toHaveURL('/verify?user=am9uQGVtYWlsLmNvbQ');
        });
    });
});
