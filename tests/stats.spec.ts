import {expect, test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/stats/Graig Fatha');
});

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' })
});

test.describe('Stats', () => {
  test('to be protected by auth0', async ({ page }) => {
    const content = page.locator('section#stats');

    await expect(content).not.toBeVisible();
  });
});
