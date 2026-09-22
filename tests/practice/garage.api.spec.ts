import test, { expect } from "@playwright/test";
import { testUser1 } from '../../test-data/validUser';
import GarageService from "../../utils/services/GarageService";
import AuthService from "../../utils/services/AuthService";
import { generateNewCar } from "../api/factories/cars.factory";

let garageService: GarageService;
let authService: AuthService;

test.beforeEach(async ({ request }) => {
    garageService = new GarageService(request);
    authService = new AuthService(request);
});

test.describe('Get all brands and models', () => {

    test('Get all brands', async () => {
        const brands = await garageService.getAllBrands();
        expect(brands).toHaveLength(5);
    });

    test('Get all models', async () => {
        const models = await garageService.getAllModels();
        expect(models).toHaveLength(23);
    });

    test('Get model by id', async () => {
        const model = await garageService.getModelById(3);

        expect(model.id).toBe(3);
        expect(model.title).toBe("Q7");
    });


    test('Get model by invalid id', async () => {
        const responseJson = await garageService.getModelByInvalidId(999);

        expect(responseJson.message).toBe("No car models found with this id");
    });
});


test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    });

    test.describe('Removing cars', () => {
        let carToRemoveId: string;

        test.beforeAll(async ({ request }) => {
            garageService = new GarageService(request)

            const newCar = generateNewCar(1,1,122)
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


    test.describe('Adding new cars', () => {
        let addedCarToRemove: string[] = [];


        test('Add new car - Audi TT', async () => {

            const newCar = generateNewCar(1,1,122)
            const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.mileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarToRemove.push(addedCar.id);
        });

        test('Add new car -Audi A4', async ({ request }) => {
            
            const newCar = generateNewCar(1,2,150)
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
});