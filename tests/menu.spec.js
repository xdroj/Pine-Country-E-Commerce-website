import { test, expect } from '@playwright/test';

test.describe('Menu Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to menu section
    await page.click('a[href="#menu"]');
    await page.waitForTimeout(500);
  });

  test('should display menu tabs correctly', async ({ page }) => {
    const menuTabs = ['Appetizers', 'Steaks', 'Sides', 'Desserts', 'Drinks'];
    
    for (const tab of menuTabs) {
      await expect(page.locator(`.menu-tab:has-text("${tab}")`)).toBeVisible();
    }
    
    // Check first tab is active by default
    await expect(page.locator('.menu-tab').first()).toHaveClass(/active/);
    await expect(page.locator('.menu-tab').first()).toHaveAttribute('aria-selected', 'true');
  });

  test('should switch between menu categories', async ({ page }) => {
    // Click on Steaks tab
    await page.click('.menu-tab[aria-controls="steaks"]');
    
    // Check tab becomes active
    await expect(page.locator('.menu-tab[aria-controls="steaks"]')).toHaveClass(/active/);
    await expect(page.locator('.menu-tab[aria-controls="steaks"]')).toHaveAttribute('aria-selected', 'true');
    
    // Check corresponding content is shown
    await expect(page.locator('#steaks')).toHaveClass(/active/);
    await expect(page.locator('#steaks')).not.toHaveAttribute('hidden');
    
    // Check other categories are hidden
    await expect(page.locator('#appetizers')).toHaveAttribute('hidden');
  });

  test('should show menu section with proper structure', async ({ page }) => {
    // Check menu section exists
    await expect(page.locator('#menu')).toBeVisible();
    await expect(page.locator('#menu')).toHaveAttribute('role', 'region');
    
    // Check section header
    await expect(page.locator('#menu-heading')).toContainText('Our Menu');
    await expect(page.locator('.section-subtitle')).toContainText('Crafted with passion');
    
    // Check menu navigation exists
    await expect(page.locator('.menu-nav')).toBeVisible();
    await expect(page.locator('.menu-nav')).toHaveAttribute('role', 'tablist');
  });

  test('should show pagination on mobile', async ({ page }) => {
    // Resize to mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check pagination is visible
    await expect(page.locator('.menu-section .pagination')).toBeVisible();
    
    // Check pagination controls
    await expect(page.locator('.pagination-btn.prev')).toBeVisible();
    await expect(page.locator('.pagination-btn.next')).toBeVisible();
    await expect(page.locator('.pagination-dot')).toHaveCount(3);
  });

  test('should handle keyboard navigation between tabs', async ({ page }) => {
    // Focus on first menu tab
    await page.locator('.menu-tab').first().focus();
    
    // Press arrow key to navigate
    await page.keyboard.press('ArrowRight');
    
    // Check if navigation works (implementation depends on actual keyboard handler)
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveAttribute('role', 'tab');
  });

  test('should display menu content areas', async ({ page }) => {
    // Check all menu content areas exist
    const categories = ['appetizers', 'steaks', 'sides', 'desserts', 'drinks'];
    
    for (const category of categories) {
      await expect(page.locator(`#${category}`)).toBeVisible();
      await expect(page.locator(`#${category}`)).toHaveAttribute('role', 'tabpanel');
    }
    
    // Check only first category is visible initially
    await expect(page.locator('#appetizers')).toHaveClass(/active/);
    await expect(page.locator('#appetizers')).not.toHaveAttribute('hidden');
  });

  test('should be accessible with proper ARIA attributes', async ({ page }) => {
    // Check menu navigation has proper ARIA
    await expect(page.locator('.menu-nav')).toHaveAttribute('aria-label', 'Menu categories');
    
    // Check tabs have proper ARIA relationships
    const firstTab = page.locator('.menu-tab').first();
    const tabControls = await firstTab.getAttribute('aria-controls');
    
    if (tabControls) {
      await expect(page.locator(`#${tabControls}`)).toHaveAttribute('aria-labelledby');
    }
  });
});

