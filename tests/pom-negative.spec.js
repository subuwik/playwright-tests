import { test, expect } from '@playwright/test';
import { login_page } from '../pages/login_page';

test('wrong password shows error', async ({ page }) => {
  const loginPage = new login_page(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'asdsad');

  await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
});