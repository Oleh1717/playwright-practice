import { test, expect } from '@playwright/test';

test.describe('Assertions Homework', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should display Sign In button', async ({ page }) => {
    const signIn = page.getByRole('button', { name: 'Sign In' });
    await expect(signIn).toBeVisible();
  });

  test('HaveText(Do more!)', async ({ page }) => {
    const heroTitle = page.locator('.hero-descriptor_title.display-2');
    await expect(heroTitle).toHaveText('Do more!');
  });

  test('should have 2 images with alt "Instructions"', async ({ page }) => {
    const images = page.getByAltText('Instructions');
    await expect(images).toHaveCount(2);
  });
});
