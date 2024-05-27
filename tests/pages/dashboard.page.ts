import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInCta: Locator;
    readonly chartSection: Locator;
    readonly chartYearSelector: Locator;
    readonly chartHeading: Locator;
    readonly primaryStatsTitle: Locator;
    readonly secondaryStatsTitle: Locator;
    readonly workoutListTitle: Locator;
    readonly previousYearBtn: Locator;
    readonly nextYearBtn: Locator;
    readonly yearSelectorDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.signInCta = page.getByRole('button', { name: /sign in/i });
        this.chartSection = page.getByTestId('chart-section');
        this.chartYearSelector = page.getByTestId('year-selector');
        this.chartHeading = this.chartSection.getByRole('heading');
        this.primaryStatsTitle = page
            .getByTestId('primary-stats-section')
            .getByRole('heading');
        this.secondaryStatsTitle = page
            .getByTestId('secondary-stats-section')
            .getByRole('heading');
        this.workoutListTitle = page
            .getByTestId('workout-list-section')
            .getByRole('heading');
        this.previousYearBtn = page.getByRole('button', {
            name: /select previous year/i,
        });
        this.nextYearBtn = page.getByRole('button', {
            name: /select next year/i,
        });
        this.yearSelectorDropdown = page.getByTestId(
            'data-year-selector-dropdown'
        );
    }

    async goTo() {
        await this.page.goto('/dashboard/running');
    }

    async login(email: string, password: string) {
        await this.page.goto('/login');
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInCta.click();
    }

    async goToPreviousYear() {
        await this.previousYearBtn.click();
    }

    async goToNextYear() {
        await this.nextYearBtn.click();
    }

    async goToLastYear() {
        await this.previousYearBtn.click({ clickCount: 4 });
    }

    async goToTotalView() {
        await this.nextYearBtn.click({ clickCount: 4 });
    }

    async selectYear(label: string) {
        await this.yearSelectorDropdown.selectOption({ label });
    }

    async expectPageToBeDashboardRunning() {
        await expect(this.page).toHaveURL('/dashboard/running');
    }

    async expectPageToBeDashboardWalking() {
        await expect(this.page).toHaveURL('/dashboard/walking');
    }
}
