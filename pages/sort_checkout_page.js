export class sort_checkout_page {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.backpackAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.backpackRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async addItemToCart() {
    await this.backpackAddToCart.click();
  }

  async removeItemFromCart() {
    await this.backpackRemove.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }
}