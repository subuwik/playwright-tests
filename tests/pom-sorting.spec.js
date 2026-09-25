import { test, expect } from '@playwright/test';
import { login_page } from '../pages/login_page';
import { sort_checkout_page } from '../pages/sort_checkout_page';

test.beforeEach(async ({ page }) => {
  const loginPage = new login_page(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});




test('sort products by price low to high', async ({ page }) => {
const sort = new sort_checkout_page(page);

  await sort.sortBy('lohi');
  await expect(sort.itemPrices.first()).toHaveText('$7.99');

});