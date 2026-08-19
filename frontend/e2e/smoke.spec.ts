import { expect, test } from '@playwright/test';

test('home page carrega e responde', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.ok()).toBeTruthy();
});
