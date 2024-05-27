import { expect, test } from '@playwright/test';
import { AccountSettings } from 'tests/pages/accountSettings.page';
import { DashboardPage } from 'tests/pages/dashboard.page';

import { email, password } from '../testData/user';

test.describe('account settings', () => {
    let account: AccountSettings;

    test.beforeEach(async ({ page, isMobile }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.login(email, password);
        await expect(page).toHaveURL('/dashboard/running');
        account = new AccountSettings(page, isMobile);
        await account.goTo();
    });

    test('has a correct heading', async () => {
        await expect(account.mainHeading).toHaveText('Account Settings');
    });
});
