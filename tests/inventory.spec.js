// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});



test('successful login shows inventory', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
});



test('add and remove item updates cart badge', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
   await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
   await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});