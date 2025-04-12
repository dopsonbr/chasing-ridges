import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/home', { waitUntil: 'domcontentloaded' });
  });

  test('should load home page with picture', async ({ page }) => {
    // Verify we're on the home page
    await expect(page).toHaveURL('/home');

    // Check if the main container is present
    const container = page.locator('[data-testid="home-container"]');
    await expect(container).toBeVisible();

    // Wait for and check if the main image is present and visible
    const mainImage = page.locator('[data-testid="logo"]');
    
    // Wait for the image to be visible with a reasonable timeout
    await expect(mainImage).toBeVisible({ timeout: 5000 });

    // Verify the image has a valid source and is loaded
    await expect(mainImage).toHaveAttribute('src', /.+/);
    await expect(mainImage).toHaveJSProperty('complete', true, { timeout: 5000 });
    
    // Check that the image has a valid width (meaning it's loaded)
    const naturalWidth = await mainImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('should have working products button', async ({ page }) => {
    // Check if the actions container is present
    const actionsContainer = page.locator('[data-testid="actions-container"]');
    await expect(actionsContainer).toBeVisible();

    // Check if the button is present and has correct text
    const productsButton = page.locator('[data-testid="view-products-button"]');
    await expect(productsButton).toBeVisible();
    await expect(productsButton).toHaveText('View Products');

    // Click the button and verify navigation
    await productsButton.click();
    await expect(page).toHaveURL('/products');
  });

  test('should navigate to products page when Products button is clicked', async ({ page }) => {
    // Get the products button
    const productsButton = page.locator('[data-testid="view-products-button"]');
    
    // Ensure button is enabled and clickable
    await expect(productsButton).toBeEnabled();
    await expect(productsButton).toBeVisible();
    
    // Click the button
    await productsButton.click();
    
    // Verify navigation occurred
    await expect(page).toHaveURL('/products');
    
    // Verify we can navigate back
    await page.goBack();
    await expect(page).toHaveURL('/home');
  });

  test('should navigate to products page when View Products text is clicked', async ({ page }) => {
    // Get the button by its text content
    const viewProductsButton = page.getByText('View Products');
    
    // Ensure text is visible and clickable
    await expect(viewProductsButton).toBeVisible();
    await expect(viewProductsButton).toBeEnabled();
    
    // Click the text
    await viewProductsButton.click();
    
    // Verify navigation
    await expect(page).toHaveURL('/products');
    
    // Additional check: verify we landed on a valid page
    const productsPage = page.locator('body');
    await expect(productsPage).toBeVisible();
  });
}); 