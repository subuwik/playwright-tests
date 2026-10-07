import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Inventory and Navigation Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('successful login shows inventory', async () => {
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('add and remove item updates cart badge', async () => {
    await inventoryPage.addBikeLightToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeBikeLightFromCart();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('adding multiple items increments cart badge', async () => {
    await inventoryPage.addItemToCart();
    await inventoryPage.addBikeLightToCart();
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('logout from sidebar menu redirects to login page', async () => {
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
  });
});