import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('count all buttons on the page', async ({ page }) => {
  const buttons = page.getByRole('button');
    const count = await buttons.count();
    console.log('Buttons count:', count);
});


test('filter buttons by text (has Text) and highlight', async ({ page }) => {
    const buttons = page.locator('button').filter({ hasText: 'Sign In' });
    await buttons.highlight();
});