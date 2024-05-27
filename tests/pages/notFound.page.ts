import { Locator, Page } from '@playwright/test';

export class NotFoundPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly notFoundErrorCode: Locator;
    readonly homePageCta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading');
        this.notFoundErrorCode = page.getByText('404');
        this.homePageCta = page.getByRole('link');
    }

    async goTo() {
        await this.page.goto('/non-existing-page-123456');
    }
}
