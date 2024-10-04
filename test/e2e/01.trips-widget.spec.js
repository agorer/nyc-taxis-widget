import { test, expect } from '@playwright/test';

test('Trips widget', async ({ page }) => {
  await page.goto('/');
  const url = await page.url();
  expect(url).toContain('#BY_DAY_OF_WEEK');

  await page.getByText('By hour').click()
  let rows = page.locator('.time-column')
  await expect(rows).toHaveCount(24)

  await page.getByText('By weekday').click()
  rows = page.locator('.time-column')
  await expect(rows).toHaveCount(7)

  await page.getByText('By month day').click()
  rows = await page.locator('.time-column')
  await expect(rows).toHaveCount(31)
});
