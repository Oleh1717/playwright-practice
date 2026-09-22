import test, { expect } from "@playwright/test"
import GarageService from "../../utils/services/GarageService";
import AuthService from "../../utils/services/AuthService";

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