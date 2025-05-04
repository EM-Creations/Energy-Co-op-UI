import {expect, test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/stats/Graig Fatha');
});

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' })
});

test.describe('Stats', () => {
  test('to exist', async ({ page }) => {
    await page.route('*/**/Customer/MeanData/Show/EnergyYield', async route => {
      const response = await route.fetch();
      console.log(response.url());
      const energyYieldJson = JSON.parse(JSON.stringify(require('./data/stats/energy-yield.json')));

      await route.fulfill({ energyYieldJson });
      await route.continue();
    });

    const content = page.locator('section#stats');

    await expect(content).toBeVisible();
  });

  test('to have the correct colour font', async ({ page }) => {
    const content = page.locator('section#stats>div');

    await expect(content).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('to have the correct background colour', async ({ page }) => {
    const content = page.locator('section#stats>div');

    await expect(content).toHaveCSS('background-color', 'rgb(156, 188, 240)');
  });

  test('to have correct site name', async ({ page }) => {
    const siteName = page.locator('section#stats>div>h1');

    await expect(siteName).toHaveText('Graig Fatha');
  });
});
