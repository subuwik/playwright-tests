import { test, expect } from '@playwright/test';
test('wrong password shows error', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('sdffsd');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('alert', { name: 'Epic sadface: Username and password do not match any user in this service' })).toBeVisible();
});
