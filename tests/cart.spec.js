import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

test.describe('Shopping Cart Tests', () => {
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('display added item in cart', async () => {
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemNames.first()).toHaveText('Sauce Labs Backpack');
  });

  test('remove item from inside cart page', async () => {
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeBackpack();
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('continue shopping returns to inventory page', async () => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();

    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });
});
