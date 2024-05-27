import { Locator, Page } from '@playwright/test';

export class EmailVerificationPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly verificationEmail: Locator;
    readonly resendEmailCta: Locator;
    readonly signInCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading');
        this.verificationEmail = page.getByTestId('verification-email');
        this.resendEmailCta = page.getByRole('button', {
            name: /resend email/i,
        });
        this.signInCta = page.getByRole('link', { name: /sign in/i });
    }

    async goTo() {
        await this.page.goto('/verify?user=am9uQGVtYWlsLmNvbQ');
    }

    async signIn() {
        await this.signInCta.click();
    }
}
