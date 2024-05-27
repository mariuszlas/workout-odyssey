import { Locator, Page } from '@playwright/test';

export class PasswordResetPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly emailInput: Locator;
    readonly codeInput: Locator;
    readonly newPasswordInput: Locator;
    readonly confirmNewPasswordInput: Locator;
    readonly requestResetCta: Locator;
    readonly resetPassowordCta: Locator;
    readonly noResetCodeCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading');
        this.emailInput = page.getByPlaceholder('name@example.com');
        this.codeInput = page.getByLabel('Password Reset Code');
        this.newPasswordInput = page.getByLabel('New Password', {
            exact: true,
        });
        this.confirmNewPasswordInput = page.getByLabel('Confirm New Password', {
            exact: true,
        });
        this.requestResetCta = page.getByRole('button', {
            name: /request password reset code/i,
        });
        this.resetPassowordCta = page.getByRole('button', {
            name: /reset password/i,
        });
        this.noResetCodeCta = page.getByRole('button', {
            name: /didn't get the password reset code?/i,
        });
    }

    async goTo() {
        await this.page.goto('/password-reset');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async requestPasswordReset() {
        await this.requestResetCta.click();
    }
}
