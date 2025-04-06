import {expect, test} from '@playwright/test';

const expectedTitle = 'Energy Co-op UI';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('titles are correct', async ({ page }) => {
  await expect(page).toHaveTitle(expectedTitle);
});

test.describe('Header', () => {
  test('to exist', async ({ page }) => {
    const header = page.locator('section#header');

    await expect(header).toBeVisible();
  });

  test('to have title', async ({ page }) => {
    const title = page.locator('section#header>div', { hasText: expectedTitle });

    await expect(title).toBeVisible();
  });

  test('to be the correct colour', async ({ page }) => {
    const title = page.locator('section#header');

    await expect(title).toHaveCSS('background-color', 'rgb(12, 125, 157)');
  });
});

test.describe('Nav Bar', () => {
  test('to exist', async ({ page }) => {
    const navbar = page.locator('div.pill-group');

    await expect(navbar).toBeVisible();
  });

  test('to have "Your Projects" link', async ({ page }) => {
    const link = page.locator('span', { hasText: "Your Projects" });

    await expect(link).toBeVisible();
  });

  test('to have "Your Documents" link', async ({ page }) => {
    const link = page.locator('span', { hasText: "Your Documents" });

    await expect(link).toBeVisible();
  });

  test('to have "Logout" link', async ({ page }) => {
    const link = page.locator('span', { hasText: "Logout" });

    await expect(link).toBeVisible();
  });
});

test.describe('Social Links', () => {
  test('to exist', async ({ page }) => {
    const socialLinks = page.locator('div.social-links');

    await expect(socialLinks).toBeVisible();
  });

  test('to have GitHub', async ({ page }) => {
    const link = page.locator('[href*="https://github.com/EM-Creations/Energy-Co-op-UI"]');

    await expect(link).toBeVisible();
  });

  test('to have Contact Us', async ({ page }) => {
    const link = page.locator('[href*="mailto:coopemail@coop.com"]');

    expect(link).toBeTruthy();
  });
});

test.describe('Content', () => {
  test('to exist', async ({ page }) => {
    const contentArea = page.locator('section#right-side');

    await expect(contentArea).toBeVisible();
  });

  test('to have title', async ({ page }) => {
    const title = page.locator('app-home>h1', { hasText: expectedTitle });

    await expect(title).toBeVisible();
  });
});
