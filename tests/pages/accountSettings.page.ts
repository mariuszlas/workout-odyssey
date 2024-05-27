import { Locator, Page } from '@playwright/test';

export class AccountSettings {
    readonly page: Page;
    readonly isMobile: boolean;
    readonly mainHeading: Locator;

    constructor(page: Page, isMobile: boolean) {
        this.page = page;
        this.isMobile = isMobile;
        this.mainHeading = page.getByRole('heading').first();
    }

    async goTo() {
        await this.page.goto('/user');
    }
}
