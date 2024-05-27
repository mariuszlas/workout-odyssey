import { expect, Locator, Page } from '@playwright/test';

export class SignupPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly form: Locator;
    readonly formSigninLink: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordConfirmationInput: Locator;
    readonly togglePasswordBtn: Locator;
    readonly togglePasswordConfirmationBtn: Locator;
    readonly signUpCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading');
        this.form = page.getByTestId('signup-form');
        this.formSigninLink = this.form.getByRole('link', { name: /sign in/i });
        this.emailInput = page.getByLabel('Email');
        this.nameInput = page.getByLabel('Name');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.passwordConfirmationInput = page.getByLabel('Confirm Password', {
            exact: true,
        });
        this.togglePasswordBtn = page.getByLabel(/toggle password visibility/i);
        this.togglePasswordConfirmationBtn = page.getByLabel(
            /toggle confirm password visibility/i
        );
        this.signUpCta = page.getByRole('button', {
            name: /create account/i,
        });
    }

    async goTo() {
        await this.page.goto('/signup');
    }

    async signIn() {
        await this.formSigninLink.click();
    }

    async signUp() {
        await this.signUpCta.click();
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillConfirmPassword(password: string) {
        await this.passwordConfirmationInput.fill(password);
    }

    async togglePasswordVisibility() {
        await this.togglePasswordBtn.click();
    }

    async toggleConfirmPasswordVisibility() {
        await this.togglePasswordConfirmationBtn.click();
    }

    async expectPasswordVisible() {
        await expect(this.passwordInput).toHaveAttribute('type', 'text');
    }

    async expectPasswordHidden() {
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }

    async expectConfirmPasswordVisible() {
        await expect(this.passwordConfirmationInput).toHaveAttribute(
            'type',
            'text'
        );
    }

    async expectConfirmPasswordHidden() {
        await expect(this.passwordConfirmationInput).toHaveAttribute(
            'type',
            'password'
        );
    }
}
