import { expect, Locator, Page } from '@playwright/test';

export class WorkoutSelector {
    readonly page: Page;
    readonly menu: Locator;
    readonly menuitems: Locator;
    readonly runningOption: Locator;
    readonly walkingOption: Locator;
    readonly cyclingOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu = page.getByRole('menu');
        this.menuitems = page.getByRole('menuitem');
        this.runningOption = this.menu.getByText(/running/);
        this.walkingOption = this.menu.getByText(/walking/);
        this.cyclingOption = this.menu.getByText(/cycling/);
    }

    async expectTwoWorkoutOptions() {
        await expect(this.cyclingOption).toBeVisible();
        await expect(this.walkingOption).toBeVisible();
    }

    async expectThreeWorkoutOptions() {
        await expect(this.runningOption).toBeVisible();
        await expect(this.cyclingOption).toBeVisible();
        await expect(this.walkingOption).toBeVisible();
    }
}
