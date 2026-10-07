import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Checkout Flow Tests', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('complete checkout flow', async () => {
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('validation error when first name is empty', async () => {
    await checkoutPage.fillInformation('', 'Doe', '12345');
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('validation error when last name is empty', async () => {
    await checkoutPage.fillInformation('John', '', '12345');
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
  });

  test('validation error when postal code is empty', async () => {
    await checkoutPage.fillInformation('John', 'Doe', '');
    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
  });

  test('cancel checkout returns to cart', async () => {
    await checkoutPage.cancel();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.checkoutButton).toBeVisible();
  });
});