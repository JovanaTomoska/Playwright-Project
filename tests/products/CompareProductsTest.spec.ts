import { test, expect } from '@playwright/test';

test('Navigate, hover and compare products', async ({ page }) => {
  await page.goto('https://woodmart.xtemos.com/home/');

  const categoriesMenu = page.locator('nav.main-nav');
  await expect(categoriesMenu).toBeVisible();

  await page.hover('nav.main-nav >> text=Categories');
  await page.click('a:has-text("Lighting")');


  const firstProduct = page.locator('.product-grid-item').filter({ hasText: 'Henectus tincidunt' });
  await firstProduct.hover();
  const firstCompareBtn = firstProduct.locator('.wd-action-btn.wd-style-icon.compare');
  await firstCompareBtn.click();

  const secondProduct = page.locator('.product-grid-item').filter({ hasText: 'Fermentum potenti' });
  await secondProduct.hover();
  const secondCompareBtn = secondProduct.locator('.wd-action-btn.wd-style-icon.compare');
  await secondCompareBtn.click();
});
