import { expect } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class AddCarForm extends BaseForm {
    public readonly formTitle = this.page.locator('.modal-title', { hasText: 'Add a car' });
    private readonly brandDropdown = this.page.locator('#addCarBrand');
    private readonly modelDropdown = this.page.locator('#addCarModel');
    private readonly mileageField = this.page.locator('#addCarMileage');
    public readonly addCarButton = this.page.getByRole('button', { name: 'Add', exact: true });
    private readonly cancelButton = this.page.getByRole('button', { name: 'Cancel' });
    private readonly iconClose = this.page.locator('button[aria-label="Close"]')
    private readonly successMessage = this.page.locator('.alert-success p', { hasText: 'Car added' });
    private readonly lastAddedCarName = this.page.locator('.car_name.h2').first();
    private readonly lastAddedCarMileageField = this.page.locator('input[name="miles"]').first();

    async addNewCar(brand: string, model: string, mileage: string) {
        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.enterMileage(mileage);
        await this.clickAddCarButton();
    }

    async verifyCarIsAdded(carName: string, carMileage: string) {
    await expect(this.successMessage).toBeVisible();

    await expect(this.page.locator('.car_name.h2', { hasText: carName }).first()).toHaveText(carName);

    await expect(this.lastAddedCarMileageField).toHaveValue(carMileage);

    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption(brand);
    }

    async selectModel(model: string) {
        await this.modelDropdown.selectOption(model);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickIconClose() {
        await this.iconClose.click();
    }
}