import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('sort products by price low to high', async ({ page }) => {
  
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  
  const firstPrice = page.locator('[data-test="inventory-item-price"]').first();
  await expect(firstPrice).toHaveText('$7.99');
});