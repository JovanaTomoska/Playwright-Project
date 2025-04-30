import { test, expect } from '@playwright/test';

const registrationURL = 'https://woodmart.xtemos.com/my-account/';

test('Successful registration', async ({ page }) => {
  await page.goto(registrationURL);

  const uniqueUsername = `testuser_${Date.now()}`; 
  const uniqueEmail = `test${Date.now()}@example.com`; 

  const usernameField = page.locator('#reg_username');
  const emailField = page.locator('#reg_email');
  const passwordField = page.locator('#reg_password');

  await expect(usernameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();

  await usernameField.fill(uniqueUsername);
  await emailField.fill(uniqueEmail);
  await passwordField.fill('563strongpassword#*');

  await page.locator('button[name="register"]').click();
});


test('An account is already registered with that username', async ({ page }) => {
  await page.goto(registrationURL);

  const usernameField = page.locator('#reg_username');
  const emailField = page.locator('#reg_email');
  const passwordField = page.locator('#reg_password');

  await expect(usernameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();

  await usernameField.fill('tomoskaj');
  await emailField.fill(`new${Date.now()}@example.com`);
  await passwordField.fill('jovana123*');

  await page.locator('button[name="register"]').click();

  const errorMessage = page.locator('.woocommerce-error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('An account is already registered with that username');
});


test('An account is already registered with that email addres', async ({ page }) => {
  await page.goto(registrationURL);

  const usernameField = page.locator('#reg_username');
  const emailField = page.locator('#reg_email');
  const passwordField = page.locator('#reg_password');

  await expect(usernameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();

  await usernameField.fill(`user${Date.now()}`);
  await emailField.fill('tomoskaj@gmail.com'); 
  await passwordField.fill('Password123!');

  await page.locator('button[name="register"]').click();

  const errorMessage = page.locator('.woocommerce-error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('An account is already registered with that email address');
});


test('The username is too short', async ({ page }) => {
  await page.goto(registrationURL);

  const usernameField = page.locator('#reg_username');
  const emailField = page.locator('#reg_email');
  const passwordField = page.locator('#reg_password');

  await expect(usernameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();

  await usernameField.fill('m'); 
  await emailField.fill(`test${Date.now()}@example.com`);
  await passwordField.fill('Password123!');

  await page.locator('button[name="register"]').click();

  const errorMessage = page.locator('.woocommerce-error');
  await expect(errorMessage).toBeVisible();


  await expect(errorMessage).toContainText(/username|valid/i); 
});

test('Empty fields', async ({ page }) => {
    await page.goto(registrationURL);
  
    await page.locator('button[name="register"]').click();
  
    const errorMessage = page.locator('.woocommerce-error');
    await expect(errorMessage).toBeVisible();
  
    
    await expect(errorMessage).toContainText(/username/i);
    await expect(errorMessage).toContainText(/email/i);
    await expect(errorMessage).toContainText(/password/i);
  });
  
