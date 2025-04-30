import { test, expect } from '@playwright/test';

test('Add product in  wishlist', async ({ page }) => {
  await page.goto('https://woodmart.xtemos.com/home/');

  const product = page.locator('[data-id="851"]');

  await product.locator('.add_to_wishlist').click();
  await expect(page.locator('.wishlist-message')).toBeVisible();

  const wishlistCount = await page.locator('.wishlist-count').textContent();
  expect(parseInt(wishlistCount || '0')).toBeGreaterThan(0);
});

test('Remove product from wishlist', async ({ page }) => {
  await page.goto('https://woodmart.xtemos.com/wishlist/');

  const product = page.locator('.wishlist-item:[data-id="851"]');

  await product.locator('.remove_from_wishlist').click();
  await expect(page.locator('.wishlist-empty-message')).toBeVisible();
  const wishlistCount = await page.locator('.wishlist-count').textContent();
  expect(parseInt(wishlistCount || '0')).toBe(0);
});



