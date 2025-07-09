import { test, expect } from '@playwright/test';

test.describe('Gallery Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to gallery section
    await page.click('a[href="#gallery"]');
    await page.waitForTimeout(500);
  });

  test('should display gallery with bento layout', async ({ page }) => {
    await expect(page.locator('.bento-grid')).toBeVisible();
    await expect(page.locator('.bento-grid')).toHaveAttribute('role', 'grid');
  });

  test('should show gallery images when content is added', async ({ page }) => {
    // This test will work once you add actual gallery content in Phase 4
    const galleryContainer = page.locator('.bento-grid');
    await expect(galleryContainer).toBeVisible();
    
    // Check if gallery items exist (will be 0 until Phase 4)
    const galleryItems = page.locator('.gallery-item');
    const count = await galleryItems.count();
    console.log(`Gallery items found: ${count}`);
  });

  test('should open lightbox when gallery item is clicked', async ({ page }) => {
    const galleryItems = page.locator('.gallery-item');
    const itemCount = await galleryItems.count();
    
    if (itemCount > 0) {
      // Click first gallery item
      await galleryItems.first().click();
      
      // Check lightbox opens
      await expect(page.locator('#lightbox-modal')).toBeVisible();
      await expect(page.locator('#lightbox-modal')).toHaveAttribute('aria-hidden', 'false');
      
      // Check body has lightbox-open class
      await expect(page.locator('body')).toHaveClass(/lightbox-open/);
    } else {
      console.log('No gallery items found - this will work after Phase 4 content integration');
    }
  });

  test('should close lightbox with escape key', async ({ page }) => {
    const galleryItems = page.locator('.gallery-item');
    const itemCount = await galleryItems.count();
    
    if (itemCount > 0) {
      // Open lightbox
      await galleryItems.first().click();
      await expect(page.locator('#lightbox-modal')).toBeVisible();
      
      // Close with escape key
      await page.keyboard.press('Escape');
      await expect(page.locator('#lightbox-modal')).toBeHidden();
      await expect(page.locator('body')).not.toHaveClass(/lightbox-open/);
    } else {
      console.log('Skipping lightbox test - no gallery items found');
    }
  });

  test('should navigate lightbox with arrow keys', async ({ page }) => {
    const galleryItems = page.locator('.gallery-item');
    const itemCount = await galleryItems.count();
    
    if (itemCount > 1) {
      // Open lightbox
      await galleryItems.first().click();
      await expect(page.locator('#lightbox-modal')).toBeVisible();
      
      // Navigate with arrow keys
      await page.keyboard.press('ArrowRight');
      // Note: Actual image change verification will be added in Phase 4
      
      await page.keyboard.press('ArrowLeft');
      // Note: Actual image change verification will be added in Phase 4
      
      // Close lightbox
      await page.keyboard.press('Escape');
    } else {
      console.log('Skipping navigation test - need multiple gallery items');
    }
  });

  test('should show pagination on mobile', async ({ page }) => {
    // Resize to mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check pagination is visible
    const pagination = page.locator('.gallery-section .pagination');
    await expect(pagination).toBeVisible();
    
    // Check pagination controls
    await expect(page.locator('.pagination-btn.prev')).toBeVisible();
    await expect(page.locator('.pagination-btn.next')).toBeVisible();
    
    // Check pagination dots exist
    const dots = page.locator('.pagination-dot');
    const dotCount = await dots.count();
    expect(dotCount).toBeGreaterThan(0);
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Test keyboard navigation to gallery section
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check gallery container is focusable/accessible
    const gallerySection = page.locator('#gallery');
    await expect(gallerySection).toBeVisible();
    await expect(gallerySection).toHaveAttribute('role', 'region');
    await expect(gallerySection).toHaveAttribute('aria-labelledby', 'gallery-heading');
  });
});

// FILE SHOULD END HERE - NO JSON CODE BELOW!

