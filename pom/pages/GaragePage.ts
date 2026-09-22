import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });
    public readonly myProfileButton: Locator = this.page.locator('//button[@id="userNavDropdown"]');
    public readonly logOutButton: Locator = this.page.locator('//a[@class="btn btn-link text-danger btn-sidebar sidebar_btn"]');
    public readonly editCarIcon = this.page.locator('.icon-edit');


    async navigate() {
        await super.navigate('/panel/garage');
    }

    async openAddCarForm() {
        await this.addCarButton.click()
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }

    private getCarCards(carName: string) {
        return this.page.locator('.car_name.h2', { hasText: carName })
            .locator('xpath=ancestor::*[.//*[contains(@class, "icon-edit")] and .//input[@name="miles"]][1]');
    }

    private async findCarCard(carName: string, carMileage: string) {
        const carCards = this.getCarCards(carName);

        for (let cardIndex = 0; cardIndex < await carCards.count(); cardIndex++) {
            const carCard = carCards.nth(cardIndex);
            if (await carCard.locator('input[name="miles"]').inputValue() === carMileage) {
                return carCard;
            }
        }

        throw new Error(`Car ${carName} with mileage ${carMileage} was not found`);
    }

    async openEditCarForm(carName: string, carMileage: string) {
        const carCard = await this.findCarCard(carName, carMileage);

        await carCard.locator('.icon-edit').click();
    }

    async verifyCarIsRemoved(carName: string, carMileage: string) {
        await expect.poll(async () => {
            const carCards = this.getCarCards(carName);
            let matchingCars = 0;

            for (let cardIndex = 0; cardIndex < await carCards.count(); cardIndex++) {
                if (await carCards.nth(cardIndex).locator('input[name="miles"]').inputValue() === carMileage) {
                    matchingCars++;
                }
            }

            return matchingCars;
        }).toBe(0);
    }
}

