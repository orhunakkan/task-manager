import { test, expect } from '@playwright/test';

test.describe('UI Tests for Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load home page and display correct elements', async ({ page }, testInfo) => {
        testInfo.annotations.push({ type: 'severity', description: 'critical' });
        const homePage = page.locator('[data-testid="home-page"]');
        const homeTitle = page.locator('[data-testid="home-title"]');
        const homeDescription = page.locator('[data-testid="home-description"]');

        await expect(homePage).toBeVisible();
        await expect(homeTitle).toHaveText('Welcome to Task Manager');
        await expect(homeDescription).toHaveText('Manage your tasks efficiently');
    });
});