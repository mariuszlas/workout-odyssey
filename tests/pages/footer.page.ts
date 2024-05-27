import { Locator, Page } from '@playwright/test';

export class Footer {
    readonly page: Page;
    readonly footer: Locator;
    readonly copyrightNote: Locator;
    readonly gitlabLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.getByTestId('footer');
        this.copyrightNote = page.getByTestId('copyright-note');
        this.gitlabLink = page.getByLabel("Visit the project's GitLab page");
    }
}
