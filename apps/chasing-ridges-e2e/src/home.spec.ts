import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/home', { waitUntil: 'domcontentloaded' });
  });

  test('should load home page with picture', async ({ page }) => {
    // Verify we're on the home page
    await expect(page).toHaveURL('/home');

    // Wait for and check if the main image is present and visible
    const mainImage = page.locator('[data-testid="logo"]');
    
    // Wait for the image to be visible with a reasonable timeout
    await expect(mainImage).toBeVisible({ timeout: 5000 });

    // Verify the image has a valid source
    await expect(mainImage).toHaveAttribute('src', /.+/);

    // Verify the image is actually loaded
    const isImageLoaded = await mainImage.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalWidth !== 0;
    });
    expect(isImageLoaded).toBeTruthy();
  });
}); 