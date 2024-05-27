import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly getStartedCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedCta = page.getByRole('button', { name: /get started/i });
    }

    async goTo() {
        await this.page.goto('/');
    }

    async getStarted() {
        await this.getStartedCta.click();
    }
}
