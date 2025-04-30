import { test, expect } from '@playwright/test';



test('Successful login with username', async ({ page }) => { 
    await page.goto('https://woodmart.xtemos.com/my-account/');
    const usernameField = page.locator('#username');
    await expect(usernameField).toBeVisible();
    await usernameField.fill('jovana'); 
    
    const passwordField = page.locator('#password');
    await expect(passwordField).toBeVisible();
    await passwordField.fill('jovana123*'); 
    
    await page.locator('button[name="login"]').click();
    await expect(page).toHaveURL(/my-account/); 
});

test('Successful login with email', async ({ page }) => { 
    await page.goto('https://woodmart.xtemos.com/my-account/');
    const usernameField = page.locator('#username');
    await expect(usernameField).toBeVisible();
    await usernameField.fill('tomoskaj@gmail.com'); 

    const passwordField = page.locator('#password');
    await expect(passwordField).toBeVisible();
    await passwordField.fill('TjOvana473*'); 
    
    await page.locator('button[name="login"]').click();
    await expect(page).toHaveURL(/my-account/); 
});


test('Тhe username and password fields are empty', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com/my-account/');
  const usernameField = page.locator('#username');
  await expect(usernameField).toBeVisible();
  

  const passwordField = page.locator('#password');
  await expect(passwordField).toBeVisible();

  await page.locator('button[name="login"]').click();
  await expect(page.locator('.woocommerce-error')).toBeVisible(); 
  await expect(page.locator('.woocommerce-error')).toContainText('Username or email address is required'); 
  await expect(page.locator('.woocommerce-error')).toContainText('Password is required'); 
});

test('Username or email address is required', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com/my-account/');
  const passwordField = page.locator('#password');
  await expect(passwordField).toBeVisible();
  
  await page.locator('#password').fill('*jovana43#');
  await page.locator('button[name="login"]').click();
  await expect(page.locator('.woocommerce-error')).toBeVisible(); 
  await expect(page.locator('.woocommerce-error')).toContainText('Username or email address is required'); 
});

test('Password is required', async ({ page }) => {
    await page.goto('https://woodmart.xtemos.com/my-account/');
  const usernameField = page.locator('#username');
  await expect(usernameField).toBeVisible();
  
  await page.locator('#username').fill('tomoskaj');
  await page.locator('button[name="login"]').click();
  await expect(page.locator('.woocommerce-error')).toBeVisible(); 
  await expect(page.locator('.woocommerce-error')).toContainText('Password is required'); 
});

test('"Lost your password?"', async ({ page }) => { 
    await page.goto('https://woodmart.xtemos.com/my-account/');
  const lostPasswordLink = page.locator('.lost_password a');
  await expect(lostPasswordLink).toBeVisible();
  await lostPasswordLink.click();
  
  await expect(page).toHaveURL(/lost-password/); 
  
  const resetEmailField = page.locator('#user_login');
  await expect(resetEmailField).toBeVisible();
  await resetEmailField.fill('tomoskaj'); 
  
  await page.locator('button[value="Reset password"]').click();
  await expect(page.locator('.woocommerce-message')).toBeVisible(); 
});

