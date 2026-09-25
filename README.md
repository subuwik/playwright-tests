# Playwright Automation Suite

Automated end to end (UI) and API test suite for [SauceDemo](https://www.saucedemo.com/) and [Reqres API](https://reqres.in/).

# Test Coverage
- *UI (E2E):*
  - Authentication (valid and invalid credentials)
  - Cart operations (add/remove items, badge counter)
  - Full checkout flow (user details form and order confirmation)
  - Inventory sorting (price low to high)
- *API:*
  - Status 200 OK and response schema validation via `request.get()`

## Tech Stack
- Playwright
- JavaScript (Node.js)
- GitHub Actions (CI/CD)

## How to Run

1. Install dependencies:
   ```bash
   npm install
   npx playwright install --with-deps