import { test, expect } from '@playwright/test';

test.describe('Reqres API Tests', () => {
  test('GET user profile status 200 and valid data', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe('janet.weaver@reqres.in');
  });

  test('GET users list status 200 and pagination metadata', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });
});