import { test, expect } from '@playwright/test';

test.describe('Feedback Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to feedback section
    await page.click('a[href="#feedback"]');
    await page.waitForTimeout(500);
  });

  test('should display feedback form with all fields', async ({ page }) => {
    await expect(page.locator('.feedback-form')).toBeVisible();
    
    // Check form fields
    await expect(page.locator('#customer-name')).toBeVisible();
    await expect(page.locator('#customer-email')).toBeVisible();
    await expect(page.locator('#customer-message')).toBeVisible();
    await expect(page.locator('.submit-btn')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('.submit-btn');
    
    // Check validation errors appear
    await expect(page.locator('.form-errors')).toBeVisible();
    await expect(page.locator('.form-errors')).toContainText('Name is required');
    await expect(page.locator('.form-errors')).toContainText('Valid email is required');
    await expect(page.locator('.form-errors')).toContainText('Message is required');
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    // Fill form with valid data
    await page.fill('#customer-name', 'John Doe');
    await page.fill('#customer-email', 'john@example.com');
    await page.fill('#customer-message', 'Amazing steaks and excellent service!');
    
    // Submit form
    await page.click('.submit-btn');
    
    // Check loading state
    await expect(page.locator('.submit-btn')).toContainText('Submitting...');
    await expect(page.locator('.submit-btn')).toBeDisabled();
    
    // Wait for submission to complete
    await page.waitForTimeout(2000);
    
    // Check success message
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('.success-message')).toContainText('Thank you for your feedback!');
    
    // Check form is reset
    await expect(page.locator('#customer-name')).toHaveValue('');
    await expect(page.locator('#customer-email')).toHaveValue('');
    await expect(page.locator('#customer-message')).toHaveValue('');
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('#customer-name', 'John Doe');
    await page.fill('#customer-email', 'invalid-email');
    await page.fill('#customer-message', 'Great food!');
    
    await page.click('.submit-btn');
    
    // Check email validation error
    await expect(page.locator('.form-errors')).toContainText('Valid email is required');
  });
});