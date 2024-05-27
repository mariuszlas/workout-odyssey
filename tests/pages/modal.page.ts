import { expect, Locator, Page } from '@playwright/test';

export class Modal {
    readonly page: Page;
    readonly modal: Locator;
    readonly heading: Locator;
    readonly closeIcon: Locator;
    readonly closeBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.getByTestId('modal-container').getByRole('dialog');
        this.heading = this.modal.getByRole('heading');
        this.closeIcon = this.modal
            .getByRole('button', { name: 'Close' })
            .first();
        this.cancelBtn = this.modal.getByRole('button', { name: 'Cancel' });
        this.closeBtn = this.modal.getByText('Close');
    }

    async closeByIcon() {
        await this.closeIcon.click();
    }

    async closeByCloseButton() {
        await this.closeBtn.click();
    }

    async closeByCancelButton() {
        await this.cancelBtn.click();
    }

    async expectVisible() {
        await expect(this.modal).toBeVisible();
    }

    async expectNotVisible() {
        await expect(this.modal).not.toBeVisible();
    }

    async expectClosedByIcon() {
        await this.closeByIcon();
        await this.expectNotVisible();
    }

    async expectClosedByCloseButton() {
        await this.closeByCloseButton();
        await this.expectNotVisible();
    }

    async expectClosedByCancelButton() {
        await this.closeByCancelButton();
        await this.expectNotVisible();
    }
}
