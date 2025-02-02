import { describe, it, expect } from 'vitest';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

let registeredUser;
let token;

describe('API Tests', () => {
    // Register test
    it('POST /api/users/register - should register a new user', async () => {
        registeredUser = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.person.fullName(),
        };

        const resp = await api.post('/users/register', registeredUser);
        expect(resp.status).toBe(201);
        expect(resp.data.status).toBe('success');
    });

    // Login test using the same data as registration
    it('POST /api/users/login - should login user', async () => {
        const resp = await api.post('/users/login', {
            email: registeredUser.email,
            password: registeredUser.password,
        });
        expect(resp.status).toBe(200);
        expect(resp.data.status).toBe('success');
        token = resp.data.token;
    });
});
