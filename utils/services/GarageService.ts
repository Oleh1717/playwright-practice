import { APIRequestContext, expect } from '@playwright/test';
export default class GarageService {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllBrands() {
        const response = await this.request.get('api/cars/brands');
        const responseJson = await response.json();
        expect(response.status()).toBe(200);
        return responseJson.data;
    }

    async getAllModels() {
        const response = await this.request.get('api/cars/models');
        const responseJson = await response.json();
        expect(response.status()).toBe(200);
        return responseJson.data;
    }

    async getModelById(id: number) {
        const response = await this.request.get(`api/cars/models/${id}`);
        const responseJson = await response.json();
        expect(response.status()).toBe(200);
        return responseJson.data;
    }

    async getModelByInvalidId(id: number) {
        const response = await this.request.get(`api/cars/models/${id}`);
        const responseJson = await response.json();
        expect(response.status()).toBe(404);
        return responseJson;
    }

    async removeCar (sid: string, id: string) {
        const response = await this.request.delete(`api/cars/${id}`, {
            headers: {
                Cookie: sid,
            },

        });
        
        return response;
    }
    
    async removeCarWithInvalidId (id: string, sid: string) {
        const response = await this.request.delete(`api/cars/${id}`, {
            headers: {
                Cookie: sid,
            },
        });
        return response;
    }

    async addCar(sid: string, carBrandId: number, carModelId: number, mileage: number) {
        const response = await this.request.post('api/cars', {
            data: {
                carBrandId,
                carModelId,
                mileage,
            },
            headers: {
                Cookie: sid,
            },
        });
        
        const responseJson = await response.json();
        expect(response.status()).toBe(201);

        const addedCar = responseJson.data;
        return addedCar;
    }

    async getUserCars(sid: string) {
        const response = await this.request.get('api/cars', {
            headers: {
                Cookie: sid,
            }
        });

        const responseJson = await response.json();
        expect(response.status()).toBe(200);
        return responseJson;
    }

}