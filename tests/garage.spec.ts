import { expect } from '@playwright/test';
import { test } from '../utils/fixtures/pagesFixtures';
import GarageService from '../utils/services/GarageService';
import { getSidFromStorageState } from '../utils/storageState/storageState';

let garageService: GarageService;



test.describe('Garage tests', () => {


    test.use({ storageState: '.states/testUser1.json' });

    test.beforeEach(async ({ app }) => {
        
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
    });

    test.describe('Adding cars', () => {
        let addedCarName: string;
        let addedCarMileage: string;

        test('Add new Car - BMW X5', async ({ app }) => {
        addedCarName = 'BMW X5';
        addedCarMileage = '999';
        await app.addCarForm.addNewCar('BMW', 'X5', '999');
        await app.addCarForm.verifyCarIsAdded(addedCarName, addedCarMileage)
        })

        test('Add new car - Audi Q7', async ({ app }) => {
        addedCarName = 'Audi Q7';
        addedCarMileage = '555';
        await app.addCarForm.addNewCar('Audi', 'Q7', '555')
        await app.addCarForm.verifyCarIsAdded(addedCarName, addedCarMileage)
        // await expect(app.page.locator('.car-item').first()).toHaveScreenshot('last-added-car-audi-q7.png', { mask: [app.page.locator('input[name="miles"]')] });
        // await expect(app.page.locator('.car-item').first()).toHaveScreenshot('last-added-car-audi-q7.png', { maxDiffPixels: 100 });

        await app.page.locator('.car-item').first().screenshot({ path: 'audi-q7.png' });
        })

        test.afterEach(async ({ request }) => {
            garageService = new GarageService(request);
            const sid = getSidFromStorageState('.states/testUser1.json');
            const allAddedCars = await garageService.getUserCars(sid);
            const lastAddedCarId = allAddedCars?.data?.[0]?.id;

            if (!lastAddedCarId) {
                return;
            }

            await garageService.removeCar(sid, lastAddedCarId);
        });
    });

    test('Add new Car without mileage', async ({ app }) => {
        await app.addCarForm.selectBrand('BMW');
        await app.addCarForm.selectModel('X5');
        await expect(app.addCarForm.addCarButton).toBeDisabled();
    });

    test('Close "Add a car" form via "Cancel" button', async ({ app }) => {
        await app.addCarForm.clickCancelButton();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    });

    test('Close "Add a car" form via "Close" icon', async ({ app }) => {
        await app.addCarForm.clickIconClose();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    });
});
