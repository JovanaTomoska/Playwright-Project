import { test, expect } from '@playwright/test';

test('Select and add product in shopping cart', async ({ page }) => {
  await page.goto('https://woodmart.xtemos.com/product-category/accessories/');

  const product = page.locator('a:has-text("iPhone Dock")');
  await expect(product).toBeVisible();
  await product.first().click();

  const colorDropdown = page.locator('select[name="attribute_pa_color"]');
  await expect(colorDropdown).toBeVisible();
  await colorDropdown.selectOption('black');

  const addToCartButton = page.locator('button.single_add_to_cart_button');
  await expect(addToCartButton).toBeEnabled();
});


test('Remove product from cart', async ({ page }) => {
  await page.goto('https://woodmart.xtemos.com/cart/');

  const productRow = page.locator('.cart_item').filter({ hasText: 'iPhone Dock' });
  const removeButton = productRow.locator('.product-remove a.remove');
  await removeButton.click();
  await expect(productRow).toHaveCount(0);
});

