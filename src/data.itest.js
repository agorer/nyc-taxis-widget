import { expect, test } from 'vitest'
import { loadData, Filter } from './data.js'

test('should filter data by hour', async () => {
  const data = await loadData(Filter.BY_HOUR)
  expect(data.length).toBe(24)
})

test('should filter data by day of week', async () => {
  const data = await loadData(Filter.BY_DAY_OF_WEEK)
  expect(data.length).toBe(7)
})

test('should filter data by day of month', async () => {
  const data = await loadData(Filter.BY_DAY_OF_MONTH)
  expect(data.length).toBeGreaterThanOrEqual(28)
  expect(data.length).toBeLessThanOrEqual(31)
})
