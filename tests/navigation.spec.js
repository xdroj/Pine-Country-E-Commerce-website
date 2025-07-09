import { test, expect } from '@playwright/test';

test.describe('Navigation Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should toggle theme correctly', async ({ page }) => {
    // Switch to dark theme
    await page.click('#dark-theme');
    await expect(page.locator('body')).toHaveClass('dark-theme');
    
    // Switch back to light theme
    await page.click('#light-theme');
    await expect(page.locator('body')).not.toHaveClass('dark-theme');
  });

  test('should handle mobile menu toggle', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.locator('.mobile-menu-toggle')).toBeVisible();
    
    await page.click('.mobile-menu-toggle');
    await expect(page.locator('.nav-menu')).toHaveClass('active');
  });

  test('navigation test', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Menu');
    await page.waitForSelector('h1:has-text("Menu")');
    expect(await page.title()).toBe('Menu - Steakhouse');
});
});