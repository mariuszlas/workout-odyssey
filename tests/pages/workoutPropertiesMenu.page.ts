import { Locator, Page } from '@playwright/test';

export class WorkoutPropertiesMenu {
    readonly page: Page;
    readonly menu: Locator;
    readonly menuitems: Locator;
    readonly propertiesMenuBtn: Locator;
    readonly editWorkoutBtn: Locator;
    readonly deleteWorkoutBtn: Locator;
    readonly workoutDetailsBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu = page.getByRole('menu');
        this.menuitems = page.getByRole('menuitem');
        this.propertiesMenuBtn = page
            .getByTestId('workout-list-section')
            .getByRole('listitem')
            .first()
            .getByLabel('Workout 11 - properties menu');
        this.editWorkoutBtn = page.getByRole('menuitem', { name: 'Edit' });
        this.workoutDetailsBtn = page.getByRole('menuitem', {
            name: 'Workout Details',
        });
        this.deleteWorkoutBtn = page.getByRole('menuitem', { name: 'Delete' });
    }

    async openWorkoutPropertiesMenu() {
        await this.propertiesMenuBtn.click();
    }

    async openDetails() {
        await this.openWorkoutPropertiesMenu();
        await this.workoutDetailsBtn.click();
    }

    async editWorkout() {
        await this.openWorkoutPropertiesMenu();
        await this.editWorkoutBtn.click();
    }

    async delete() {
        await this.openWorkoutPropertiesMenu();
        await this.deleteWorkoutBtn.click();
    }
}
