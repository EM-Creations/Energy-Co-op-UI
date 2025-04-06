import {expect, test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/projects');
});

test.describe('Projects', () => {
  test('to exist', async ({ page }) => {
    const projects = page.locator('section#projects');

    await expect(projects).toBeVisible();
  });
});

test.describe('Project', () => {
  test('to exist', async ({ page }) => {
    const project = page.locator('div.project').first();

    await expect(project).toBeVisible();
  });

  test('to have the correct colour font', async ({ page }) => {
    const project = page.locator('div.project').first();

    await expect(project).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('to have the correct background colour', async ({ page }) => {
    const project = page.locator('div.project').first();

    await expect(project).toHaveCSS('background-color', 'rgb(156, 188, 240)');
  });
});
