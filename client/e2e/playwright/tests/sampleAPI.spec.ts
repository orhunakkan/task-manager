import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseURL = 'http://localhost:8080/api';

test.describe.serial('API Tests', () => {

  let registeredUser: { email: any; password: any; name?: string; };

  test('POST /api/users/register - should register a new user', async ({ request }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'critical' });
    registeredUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };

    const response = await request.post(`${baseURL}/users/register`, {
      data: registeredUser,
    });

    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData.status).toBe('success');
  });

  test('POST /api/users/login - should login user', async ({ request }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'critical' });
    const response = await request.post(`${baseURL}/users/login`, {
      data: {
        email: registeredUser.email,
        password: registeredUser.password,
      },
    });

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData.status).toBe('success');
  });
});
