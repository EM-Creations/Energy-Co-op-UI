import {expect, test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/projects');
});

test.describe('Projects', () => {
  test('to be protected by auth0', async ({ page }) => {
    const projects = page.locator('section#projects');

    await expect(projects).not.toBeVisible();
  });
});
