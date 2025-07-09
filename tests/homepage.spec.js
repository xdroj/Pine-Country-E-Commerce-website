import { test, expect } from '@playwright/test';

test.describe('Pine Country Steaks & Waffles Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage with fire loader', async ({ page }) => {
    // Check if fire loader is visible initially
    await expect(page.locator('#fire-loader')).toBeVisible();
    
    // Wait for loader to disappear
    await expect(page.locator('#fire-loader')).toBeHidden({ timeout: 10000 });
    
    // Check main content is visible after loading
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Pine Country Steaks & Waffles/);
  });

  test('should show hero section with correct content', async ({ page }) => {
    await expect(page.locator('.hero-title')).toContainText('Pine Country Steaks & Waffles');
    await expect(page.locator('.hero-tagline')).toContainText('Where Premium Meets Perfection');
  });
});