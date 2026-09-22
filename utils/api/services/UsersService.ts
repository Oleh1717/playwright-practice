import { APIRequestContext, expect } from "@playwright/test";

export default class UsersService {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async deleteUser(sid: string) {
        await this.request.delete('/api/users', {
            headers: {
                'cookie': sid
            }
        });
    }
}
