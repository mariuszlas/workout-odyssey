import { expect, Locator, Page } from '@playwright/test';

export class WorkoutDetails {
    readonly page: Page;
    readonly drawer: Locator;
    readonly heading: Locator;
    readonly closeIcon: Locator;
    readonly items: Locator;
    readonly map: Locator;

    constructor(page: Page) {
        this.page = page;
        this.drawer = page.getByRole('dialog').getByTestId('drawer-container');
        this.heading = this.drawer.getByRole('heading');
        this.closeIcon = this.drawer.getByRole('button', { name: 'Close' });
        this.items = this.drawer.getByRole('listitem');
        this.map = this.drawer.getByTestId('workout-map');
    }

    async closeByIcon() {
        await this.closeIcon.click();
    }

    async expectVisible() {
        await expect(this.drawer).toBeVisible();
    }

    async expectNotVisible() {
        await expect(this.drawer).not.toBeVisible();
    }

    async expectClosedByIcon() {
        await this.closeByIcon();
        await this.expectNotVisible();
    }
}
