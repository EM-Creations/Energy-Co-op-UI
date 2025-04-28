import {expect, test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/stats/Graig Fatha');
});

test.describe('Stats', () => {
  test('to exist', async ({ page }) => {
    const content = page.locator('p');

    await expect(content).toBeVisible();
  });
});
