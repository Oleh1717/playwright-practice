import test, { expect } from "@playwright/test";
import { testUser1 } from '../../test-data/validUser';
import GarageService from "../../utils/services/GarageService";
import AuthService from "../../utils/services/AuthService";
import { generateNewCar } from "./factories/cars.factory";

let garageService: GarageService;
let authService: AuthService;
let sid: string;
let carToRemoveId: string;

test.describe('Removing cars', () => {

    test.beforeEach(async ({ request }) => {
        garageService = new GarageService(request);
        authService = new AuthService(request);
    });


    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    });



    test.beforeAll(async ({ request }) => {
        garageService = new GarageService(request)

        const newCar = generateNewCar(1, 1, 122)
        const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);
        carToRemoveId = addedCar.id;
    });


    test('Remove a car', async () => {
        const response = await garageService.removeCar(carToRemoveId, sid);
        expect(response.status()).toBe(200);
    });

    test('Remove a car with invalid id', async () => {
        const response = await garageService.removeCarWithInvalidId('999', sid);

        const responseJson = await response.json();
        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('Car not found');
    });

});