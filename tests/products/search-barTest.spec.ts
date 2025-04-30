import { test, expect } from '@playwright/test';

test('Search-bar is visible', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com');
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test('Search product', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com');
    await page.locator('input[type="search"]').fill('watch');
    await page.keyboard.press('Enter');
    await expect(page.locator('.product')).toHaveText('watch')
  });


  test('Product not found', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com');
    await page.locator('input[type="search"]').fill('xyz123');
    await page.keyboard.press('Enter');
    await expect(page.locator('.woocommerce-info')).toHaveText(/No products/); 
  });


  test('Empty field', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com/');

    await page.click('.wd-tools-element.wd-header-search');
    const searchInput = page.locator('input[type="search"]');
    await searchInput.press('Enter');
    const errorMessage = page.locator('input[type="search"]:invalid');
    await expect(errorMessage).toBeVisible();
});

  
  
  
  