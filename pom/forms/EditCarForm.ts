import { expect } from '@playwright/test';
import { BaseForm } from './BaseForm';


export class EditCarForm extends BaseForm {
    private readonly removeCarButton = this.page.locator('.btn-outline-danger');
    private readonly removeCarConfirmationButton = this.page.locator('.btn-danger');

    async removeOpenedCar() {
        await this.removeCarButton.click();
        await this.removeCarConfirmationButton.click();
    }
}