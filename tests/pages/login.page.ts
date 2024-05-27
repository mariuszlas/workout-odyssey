import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly form: Locator;
    readonly formSignupLink: Locator;
    readonly forgotPasswordLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly togglePasswordBtn: Locator;
    readonly signInCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading');
        this.form = page.getByTestId('login-form');
        this.formSignupLink = this.form.getByRole('link', { name: /sign up/i });
        this.forgotPasswordLink = this.form.getByRole('link', {
            name: /forgot password?/i,
        });
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.togglePasswordBtn = page.getByLabel(/toggle password visibility/i);
        this.signInCta = page.getByRole('button', { name: /sign in/i });
    }

    async goTo() {
        await this.page.goto('/login');
    }

    async signup() {
        await this.formSignupLink.click();
    }

    async signIn() {
        await this.signInCta.click();
    }

    async resetPassword() {
        await this.forgotPasswordLink.click();
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async togglePasswordVisibility() {
        await this.togglePasswordBtn.click();
    }

    async expectPasswordVisible() {
        await expect(this.passwordInput).toHaveAttribute('type', 'text');
    }

    async expectPasswordHidden() {
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }
}
