import { expect, test } from 'vitest'
import { TimeFilter } from './time-filter.js'
import { render, click } from '../test/utils.js'

test('should load component', () => {
  const element = render('time-filter')
  expect(element).not.toBeNull()
})

test('should select hour option on click', () => {
  let value = undefined
  const element = render('time-filter', { onChange: (filter) => value = filter })
  const byHour = element.getElementById('by-hour')

  click(byHour)

  expect(value).toBe('BY_HOUR')
  expect(location.hash).toBe('#BY_HOUR')
})

test('should select weekday option on click', () => {
  let value = undefined
  const element = render('time-filter', { onChange: (filter) => value = filter })
  const byWeekday = element.getElementById('by-weekday')

  click(byWeekday)

  expect(value).toBe('BY_DAY_OF_WEEK')
  expect(location.hash).toBe('#BY_DAY_OF_WEEK')
})

test('should select monthday option on click', () => {
  let value = undefined
  const element = render('time-filter', { onChange: (filter) => value = filter })
  const byMonthday = element.getElementById('by-monthday')

  click(byMonthday)

  expect(value).toBe('BY_DAY_OF_MONTH')
  expect(location.hash).toBe('#BY_DAY_OF_MONTH')
})

test('should select option programmatically', () => {
  let value = undefined
  const element = render('time-filter', { onChange: (filter) => value = filter })
  const byHour = element.getElementById('by-hour')

  element.host.selectFilter('BY_HOUR')

  expect(value).toBe('BY_HOUR')
  expect(location.hash).toBe('#BY_HOUR')
  expect(byHour.checked).toBe(true)
})
