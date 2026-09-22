import { expect } from '@playwright/test';
import { testUser1, testUser2 } from '../../test-data/validUser';
import { test as setup } from '../../utils/fixtures/pagesFixtures';
import AuthService from '../../utils/services/AuthService';



setup.describe('Get storage state for test users', () => {

    setup('Log in as testUser1 and save storage state', async ({ request}) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(testUser1.email, testUser1.password);
        expect(response.status()).toBe(200);

        await request.storageState({ path: '.states/testUser1.json' });
    });

    setup('Log in as testUser2 and save storage state', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(testUser2.email, testUser2.password);
        expect(response.status()).toBe(200);

        await request.storageState({ path: '.states/testUser2.json' });
    });
});
