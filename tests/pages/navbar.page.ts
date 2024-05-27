import { expect, Locator, Page } from '@playwright/test';

export class Navbar {
    readonly page: Page;
    readonly isMobile: boolean;
    readonly html: Locator;
    readonly navbar: Locator;
    readonly logo: Locator;
    readonly themeSwitch: Locator;
    readonly mobileThemeSwitch: Locator;
    readonly userMenuBtn: Locator;
    readonly newWorkoutBtn: Locator;
    readonly mobileNewWorkoutBtn: Locator;
    readonly workoutSelectorBtn: Locator;
    readonly dashboardLink: Locator;
    readonly signupCta: Locator;
    readonly mobileSignupCta: Locator;
    readonly loginCta: Locator;
    readonly mobileLoginCta: Locator;
    readonly mobileMenuBtn: Locator;
    readonly mobileMenuCloseBtn: Locator;
    readonly mobileMenu: Locator;

    constructor(page: Page, isMobile: boolean) {
        this.page = page;
        this.isMobile = isMobile;
        this.html = page.locator('html');
        this.navbar = page.getByRole('navigation');
        this.mobileMenuBtn = this.navbar.getByLabel('Main menu');
        this.mobileMenu = page.getByTestId('drawer-container');
        this.mobileMenuCloseBtn = this.mobileMenu.getByLabel('close');
        this.themeSwitch = this.navbar.getByLabel('theme switch');
        this.mobileThemeSwitch = this.mobileMenu.getByLabel('theme switch');
        this.userMenuBtn = this.navbar.getByLabel('User menu');
        this.logo = this.navbar.getByTestId('logo');
        this.mobileNewWorkoutBtn = page.getByTestId('floating-new-workout-btn');
        this.workoutSelectorBtn = page.getByTestId('workout-selector');
        this.dashboardLink = this.navbar.getByRole('link', {
            name: /dashboard/i,
        });
        this.newWorkoutBtn = this.navbar.getByRole('button', {
            name: /add workout/i,
        });
        this.signupCta = this.navbar.getByRole('link', {
            name: /create account/i,
        });
        this.mobileSignupCta = this.mobileMenu.getByRole('menuitem', {
            name: /create account/i,
        });
        this.loginCta = this.navbar.getByRole('link', { name: /sign in/i });
        this.mobileLoginCta = this.mobileMenu.getByRole('menuitem', {
            name: /sign in/i,
        });
    }

    async openMobileMenu() {
        await this.mobileMenuBtn.click();
        await expect(this.mobileMenu).toBeVisible();
    }

    async closeMobileMenu() {
        await this.mobileMenuCloseBtn.click();
        await expect(this.mobileMenu).not.toBeVisible();
    }

    async login() {
        if (this.isMobile) {
            await this.openMobileMenu();
            await this.mobileLoginCta.click();
            await expect(this.mobileMenu).not.toBeVisible();
        } else {
            await this.loginCta.click();
        }
    }

    async signup() {
        if (this.isMobile) {
            await this.openMobileMenu();
            await this.mobileSignupCta.click();
            await expect(this.mobileMenu).not.toBeVisible();
        } else {
            await this.signupCta.click();
        }
    }

    async gotToHome() {
        await this.logo.click();
    }

    async addNewWorkout() {
        const btn = this.isMobile
            ? this.mobileNewWorkoutBtn
            : this.newWorkoutBtn;
        await btn.click();
    }

    async toggleTheme() {
        const btn = this.isMobile ? this.mobileThemeSwitch : this.themeSwitch;
        await btn.click();
    }

    async expectThemeToggleToBeVisible() {
        if (this.isMobile) {
            await this.openMobileMenu();
            await expect(this.mobileThemeSwitch).toBeVisible();
        } else {
            await expect(this.themeSwitch).toBeVisible();
        }
    }

    async expectPageToBeLogin() {
        await expect(this.page).toHaveURL('/login');
    }

    async expectPageToBeSignup() {
        await expect(this.page).toHaveURL('/signup');
    }

    async expectPageToBeHome() {
        await expect(this.page).toHaveURL('/');
    }

    async expectMobileMenuClosed() {
        await expect(this.mobileMenu).not.toBeVisible();
    }

    async expectMobileMenuOpened() {
        await expect(this.mobileMenu).toBeVisible();
    }

    async execpectLightTheme() {
        await expect(this.html).toHaveAttribute('data-theme', 'light');
    }

    async execpectDarkTheme() {
        await expect(this.html).toHaveAttribute('data-theme', 'dark');
    }
}
