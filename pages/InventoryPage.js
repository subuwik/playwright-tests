export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.backpackAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.backpackRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.bikeLightAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.bikeLightRemove = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addItemToCart() {
    await this.backpackAddToCart.click();
  }

  async removeItemFromCart() {
    await this.backpackRemove.click();
  }

  async addBikeLightToCart() {
    await this.bikeLightAddToCart.click();
  }

  async removeBikeLightFromCart() {
    await this.bikeLightRemove.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async getAllItemPrices() {
    const priceTexts = await this.itemPrices.allInnerTexts();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }

  async getAllItemNames() {
    return await this.itemNames.allInnerTexts();
  }
}
