# Playwright Tests

[![Playwright Tests](https://github.com/subuwik/playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/subuwik/playwright-tests/actions/workflows/playwright.yml)

UI and API tests written with Playwright and JavaScript.

- UI tests: [SauceDemo](https://www.saucedemo.com/)
- API tests: [Reqres](https://reqres.in/)

Tests run in Chromium, Firefox and WebKit. They also run automatically on GitHub Actions on every push and pull request.

## What is tested

- **Login:** valid login, wrong password, locked out user, empty fields
- **Inventory:** product list, cart badge, logout
- **Sorting:** by price and by name in both directions (the whole list is checked, not just the first item)
- **Cart:** items in cart, removing items, continue shopping
- **Checkout:** full order flow, required field errors, cancel
- **API:** single user and user list (status codes and response data)

## Structure

```
pages/   page objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
tests/   test files
.github/workflows/playwright.yml   CI pipeline
```

Locators and page actions live in the page objects, so the tests stay short. If a locator changes, I only need to update it in one place.

## How to run

```bash
npm ci
npx playwright install
npm test
```

Other useful commands:

```bash
npm run test:headed                     # run with the browser visible
npm run test:ui                         # Playwright UI mode
npx playwright test --project=chromium  # one browser only
npm run test:report                     # open the HTML report
```