/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

let registeredUser: { email: any; password: any; name?: string; };

describe('API Tests', () => {
    it('POST /api/users/register - should register a new user', () => {
        registeredUser = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.person.fullName(),
        };
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/users/register',
            body: registeredUser,
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.status).to.eq('success');
        });
    });

    it('POST /api/users/login - should login user', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/users/login',
            body: {
                email: registeredUser.email,
                password: registeredUser.password,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('success');
        });
    });
});
