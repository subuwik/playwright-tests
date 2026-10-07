import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Product Sorting Tests', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
    await expect(inventoryPage.itemPrices.first()).toHaveText('$7.99');
  });

  test('sort products by price high to low', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getAllItemPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
    await expect(inventoryPage.itemPrices.first()).toHaveText('$49.99');
  });

  test('sort products by name A to Z', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getAllItemNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
  });

  test('sort products by name Z to A', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getAllItemNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
    await expect(inventoryPage.itemNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });
});