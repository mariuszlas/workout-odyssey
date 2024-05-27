import { expect, test } from '@playwright/test';
import { NotFoundPage } from 'tests/pages/notFound.page';

test.describe('404 Not Found page', () => {
    let notFoundPage: NotFoundPage;

    test.beforeEach(async ({ page }) => {
        notFoundPage = new NotFoundPage(page);
        await notFoundPage.goTo();
    });

    test('has the 404 Not found error message', async () => {
        await expect(notFoundPage.notFoundErrorCode).toBeVisible();
        await expect(notFoundPage.heading).toHaveText(/page not found/i);
    });

    test('has a link that navigates to the landing page on click', async ({
        page,
    }) => {
        await notFoundPage.homePageCta.click();
        await expect(page).toHaveURL('/');
    });
});
