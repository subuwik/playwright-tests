import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login Negative Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('wrong password shows error', async () => {
    await loginPage.login('standard_user', 'asdsad');
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('locked out user shows locked out error', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('empty username and password shows username required error', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username is required'
    );
  });

  test('empty password shows password required error', async () => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Password is required'
    );
  });
});