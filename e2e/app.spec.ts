import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads with correct title and navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('VALUATION MONITOR')).toBeVisible();
    await expect(page.getByText('BR Stocks')).toBeVisible();
    await expect(page.getByText('USA Stocks')).toBeVisible();
    await expect(page.getByText('BR FII')).toBeVisible();
    await expect(page.getByText('USA REIT')).toBeVisible();
  });

  test('language switcher toggles to English and back', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Análise Fundamentalista', { exact: true })).toBeVisible();

    // Set EN cookie and reload
    await page.evaluate(() => { document.cookie = 'NEXT_LOCALE=en; path=/; SameSite=Lax; max-age=31536000'; });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Fundamental Analysis', { exact: true })).toBeVisible({ timeout: 15000 });

    // Set PT cookie and reload
    await page.evaluate(() => { document.cookie = 'NEXT_LOCALE=pt-BR; path=/; SameSite=Lax; max-age=31536000'; });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Análise Fundamentalista', { exact: true })).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Privacy page', () => {
  test('loads without errors', async ({ page }) => {
    await page.goto('/privacidade');
    await expect(page.getByText('Política de Privacidade')).toBeVisible();
  });
});

test.describe('Stock pages', () => {
  test('BR stocks page renders without crash', async ({ page }) => {
    await page.goto('/stocks/br');
    await expect(page.getByText('VALUATION MONITOR')).toBeVisible();
  });

  test('USA stocks page renders without crash', async ({ page }) => {
    await page.goto('/stocks/usa');
    await expect(page.getByText('VALUATION MONITOR')).toBeVisible();
  });

  test('BR FII page renders without crash', async ({ page }) => {
    await page.goto('/stocks/br-fii');
    await expect(page.getByText('VALUATION MONITOR')).toBeVisible();
  });

  test('USA REIT page renders without crash', async ({ page }) => {
    await page.goto('/stocks/usa-reit');
    await expect(page.getByText('VALUATION MONITOR')).toBeVisible();
  });
});
