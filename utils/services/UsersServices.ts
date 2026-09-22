import { APIRequestContext, expect } from '@playwright/test';

export default class UsersService {
	private request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async deleteUser(sid: string) {
		return await this.request.delete('/api/users', {
			headers: {
				cookie: sid
			}
		});
	}

	async createUser(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
		const response = await this.request.post('/api/auth/signup', {
			data: {
				name,
				lastName,
				email,
				password,
				repeatPassword
			}
		});

		expect(response.status()).toBe(201);
		return response;
	}
}
