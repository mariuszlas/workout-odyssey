import { Locator, Page } from '@playwright/test';

export class BestResults {
    readonly page: Page;
    readonly modal: Locator;
    readonly items: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.getByTestId('modal-container').getByRole('dialog');
        this.items = this.modal.getByRole('listitem');
    }
}
