import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the products page before each test
    await page.goto('/products', { waitUntil: 'domcontentloaded' });
  });

  test('should display featured products carousel', async ({ page }) => {
    // Check if the carousel container exists
    const carousel = page.locator('[data-testid="featured-carousel"]');
    await expect(carousel).toBeVisible();

    // Verify carousel has slides
    const carouselSlides = await page.locator('[data-testid="carousel-slide"]').all();
    expect(carouselSlides.length).toBeGreaterThan(0);

    // Check if navigation arrows are present and functional
    const nextButton = page.locator('[data-testid="carousel-next"]');
    const prevButton = page.locator('[data-testid="carousel-prev"]');
    
    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();

    // Test carousel navigation
    const firstSlide = page.locator('[data-testid="carousel-slide"]').first();
    await expect(firstSlide).toBeVisible();
    
    await nextButton.click();
    await expect(firstSlide).not.toBeVisible();
  });

  test('should display product cards with add to cart functionality', async ({ page }) => {
    // Check if the products grid container exists
    const productsGrid = page.locator('[data-testid="products-grid"]');
    await expect(productsGrid).toBeVisible();

    // Get all product cards
    const productCards = await page.locator('[data-testid="product-card"]').all();
    
    // Verify we have multiple products
    expect(productCards.length).toBeGreaterThan(0);

    // Check the first product card for required elements
    const firstCard = page.locator('[data-testid="product-card"]').first();
    await expect(firstCard).toBeVisible();

    // Verify product card content
    await expect(firstCard.locator('[data-testid="product-image"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="product-title"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="product-price"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="add-to-cart-button"]')).toBeVisible();

    // Test add to cart functionality
    const addToCartButton = firstCard.locator('[data-testid="add-to-cart-button"]');
    await expect(addToCartButton).toBeEnabled();
    
    // Click add to cart and verify some feedback (like a toast or cart counter update)
    await addToCartButton.click();
    await expect(page.locator('[data-testid="cart-notification"]')).toBeVisible();
  });

 
}); 