import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('titles are correct', async ({ page }) => {
  await expect(page).toHaveTitle('Energy Co-op UI');
});

test.describe('Nav Bar', () => {
  test('to exist', async ({ page }) => {
    const navbar = page.locator('div.pill-group');

    await expect(navbar).toBeVisible();
  });
});
