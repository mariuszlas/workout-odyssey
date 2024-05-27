import { Locator, Page } from '@playwright/test';

export class WorkoutList {
    readonly page: Page;
    readonly isMobile: boolean;
    readonly workoutListSection: Locator;
    readonly heading: Locator;
    readonly firstPageBtn: Locator;
    readonly secondPageBtn: Locator;
    readonly thirdPageBtn: Locator;
    readonly allWorkoutsToggle: Locator;
    readonly workouts: Locator;
    readonly noWorkoutsMsg: Locator;
    readonly mobileFilterBtn: Locator;

    constructor(page: Page, isMobile: boolean) {
        this.page = page;
        this.isMobile = isMobile;
        this.workoutListSection = page.getByTestId('workout-list-section');
        this.allWorkoutsToggle =
            this.workoutListSection.getByLabel('All Workouts');
        this.heading = this.workoutListSection.getByRole('heading');
        this.workouts = this.workoutListSection.getByRole('listitem');
        this.noWorkoutsMsg = this.workoutListSection.getByTestId(
            'no-workouts-message'
        );
        this.firstPageBtn = this.workoutListSection.getByRole('button', {
            name: '1',
            exact: true,
        });
        this.secondPageBtn = this.workoutListSection.getByRole('button', {
            name: '2',
            exact: true,
        });
        this.thirdPageBtn = this.workoutListSection.getByRole('button', {
            name: '3',
            exact: true,
        });
        this.mobileFilterBtn = this.workoutListSection.getByRole('button', {
            name: 'Filter',
            exact: true,
        });
    }

    async toggleMobileFilters() {
        await this.mobileFilterBtn.click();
    }

    async togglAllWorkouts(repeat?: boolean) {
        if (this.isMobile && !repeat) {
            await this.toggleMobileFilters();
        }
        await this.allWorkoutsToggle.last().click();
    }
}
