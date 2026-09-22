import test, { expect } from "@playwright/test";
import { testUser1 } from '../../test-data/validUser';
import GarageService from "../../utils/services/GarageService";
import AuthService from "../../utils/services/AuthService";
import { generateNewCar } from "./factories/cars.factory";

let garageService: GarageService;
let authService: AuthService;
let sid: string;

test.beforeAll(async ({ request }) => {
    authService = new AuthService(request);
    sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
});
test.beforeEach(async ({ request }) => {
    garageService = new GarageService(request);
    authService = new AuthService(request);
});



test.describe('Adding new cars', () => {
    let addedCarToRemove: string[] = [];


    test('Add new car - Audi TT', async () => {

        const newCar = generateNewCar(1, 1, 122)
        const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

        expect(addedCar.carBrandId).toBe(newCar.carBrandId);
        expect(addedCar.carModelId).toBe(newCar.carModelId);
        expect(addedCar.mileage).toBe(newCar.mileage);
        expect(addedCar.id).toBeDefined();

        addedCarToRemove.push(addedCar.id);
    });

    test('Add new car -Audi A4', async ({ request }) => {

        const newCar = generateNewCar(1, 2, 150)
        const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

        expect(addedCar.carBrandId).toBe(newCar.carBrandId);
        expect(addedCar.carModelId).toBe(newCar.carModelId);
        expect(addedCar.mileage).toBe(newCar.mileage);
        expect(addedCar.id).toBeDefined();

        addedCarToRemove.push(addedCar.id);
    });

    test.afterAll(async ({ request }) => {
        const garageService = new GarageService(request);

        for (const carId of addedCarToRemove) {
            await garageService.removeCar(carId, sid);
        }
    });
});