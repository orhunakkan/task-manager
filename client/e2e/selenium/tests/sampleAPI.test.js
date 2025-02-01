import { describe, it, expect } from 'vitest';
import { get, post, put, patch, delete as deleteRequest } from 'axios';
import { newUser, updatedUserPut, updatedUserPatch, newUserRegister, failedUserRegister, userLogin, failedUserLogin } from '../payloads/samplePayload.json';

const baseURL = 'https://reqres.in/api';

describe('Reqres API Tests', () => {
  it('should fetch a list of users', async () => {
    const response = await get(`${baseURL}/users?page=2`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  it('should fetch a single user', async () => {
    const response = await get(`${baseURL}/users/2`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id', 2);
  });

  it('should return 404 for a non-existent user', async () => {
    const response = await get(`${baseURL}/users/23`);
    expect(response.status).toBe(404);
  });

  it('should create a new user', async () => {
    const response = await post(`${baseURL}/users`, newUser);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('name', newUser.name);
    expect(response.data).toHaveProperty('job', newUser.job);
  });

  it('should update a user', async () => {
    const response = await put(`${baseURL}/users/2`, updatedUserPut);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('name', updatedUserPut.name);
    expect(response.data).toHaveProperty('job', updatedUserPut.job);
  });

  it('should update a user with PATCH', async () => {
    const response = await patch(`${baseURL}/users/2`, updatedUserPatch);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('name', updatedUserPatch.name);
    expect(response.data).toHaveProperty('job', updatedUserPatch.job);
  });

  it('should delete a user', async () => {
    const response = await deleteRequest(`${baseURL}/users/2`);
    expect(response.status).toBe(204);
  });

  it('should register a user successfully', async () => {
    const response = await post(`${baseURL}/register`, newUserRegister);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('token');
  });

  it('should fail to register a user', async () => {
    const response = await post(`${baseURL}/register`, failedUserRegister);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('should login a user successfully', async () => {
    const response = await post(`${baseURL}/login`, userLogin);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  it('should fail to login a user', async () => {
    const response = await post(`${baseURL}/login`, failedUserLogin);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('should fetch a list of resources', async () => {
    const response = await get(`${baseURL}/unknown`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  it('should fetch a single resource', async () => {
    const response = await get(`${baseURL}/unknown/2`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id', 2);
  });

  it('should return 404 for a non-existent resource', async () => {
    const response = await get(`${baseURL}/unknown/23`);
    expect(response.status).toBe(404);
  });

  it('should fetch a delayed response', async () => {
    const response = await get(`${baseURL}/users?delay=3`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});