import { Locator, Page } from '@playwright/test';

export class UserMenu {
    readonly page: Page;
    readonly menu: Locator;
    readonly menuitems: Locator;
    readonly heading: Locator;
    readonly userEmail: Locator;
    readonly bestResultsBtn: Locator;
    readonly accountSettingsLink: Locator;
    readonly signoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu = page.getByRole('menu');
        this.menuitems = page.getByRole('menuitem');
        this.heading = this.menu.getByRole('heading');
        this.userEmail = this.menu.getByTestId('user-menu-email');
        this.bestResultsBtn = this.menu.getByRole('menuitem', {
            name: /best results/i,
        });
        this.accountSettingsLink = this.menu.getByRole('menuitem', {
            name: /account settings/i,
        });
        this.signoutBtn = this.menu.getByRole('menuitem', {
            name: /sign out/i,
        });
    }

    async openBestResults() {
        await this.bestResultsBtn.click();
    }

    async openAccountSettings() {
        await this.accountSettingsLink.click();
    }

    async signout() {
        await this.signoutBtn.click();
    }
}
