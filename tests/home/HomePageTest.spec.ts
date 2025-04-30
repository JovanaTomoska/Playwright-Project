import { test, expect } from '@playwright/test';


test('Login flow test on Woodmart', async ({ page }) => {

  await page.goto('https://woodmart.xtemos.com/home/');
  await expect(page).toHaveURL('https://woodmart.xtemos.com/home/');

  await expect(page.locator('body')).toBeVisible();

  await page.waitForSelector('.wd-header-my-account a', { timeout: 5000 });
  const loginIcon = page.locator('.wd-header-my-account a');
  await expect(loginIcon).toBeVisible();

  await loginIcon.click();

  const usernameField = page.locator('#username');
  await expect(usernameField).toBeVisible();

  const passwordField = page.locator('#password');
  await expect(passwordField).toBeVisible();

 
  await usernameField.click();
  await usernameField.fill('jovana');

  await passwordField.click();
  await passwordField.fill('jovana123*');

  const loginButton = page.locator('button[name="login"]');
  await expect(loginButton).toBeVisible();
  await loginButton.click();
});


