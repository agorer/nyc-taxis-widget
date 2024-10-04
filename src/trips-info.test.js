import { expect, test } from 'vitest'
import { TripsInfo } from './trips-info.js'
import { render } from '../test/utils.js'
import { Filter } from './data.js'

test('should load component', () => {
  const element = render('trips-info')
  expect(element).not.toBeNull()
})

test('should show correct header when filtering by hours', () => {
  const element = render('trips-info', { data: [], appliedFilter: Filter.BY_HOUR })
  const header = element.getElementById('time-column')

  expect(header.innerHTML).toBe('Hour')
})

test('should show correct header when filtering by weekday', () => {
  const element = render('trips-info', { data: [], appliedFilter: Filter.BY_DAY_OF_WEEK })
  const header = element.getElementById('time-column')

  expect(header.innerHTML).toBe('Day')
})

test('should show correct header when filtering by monthday', () => {
  const element = render('trips-info', { data: [], appliedFilter: Filter.BY_DAY_OF_MONTH })
  const header = element.getElementById('time-column')

  expect(header.innerHTML).toBe('Day')
})

test('should show all the data', () => {
  const data = [
    { time: 0, trips: 111 },
    { time: 1, trips: 222 },
    { time: 2, trips: 333 },
  ]
  const element = render('trips-info', { data: data, appliedFilter: Filter.BY_HOUR })
  const rows = element.querySelectorAll('.data-row')

  expect(rows.length).toBe(3)
})

test('should show data for specific row', () => {
  const data = [{ time: 0, trips: 111 }]
  const element = render('trips-info', { data: data, appliedFilter: Filter.BY_HOUR })
  const row = element.querySelectorAll('.data-row')[0]
  const time = row.querySelector('.time-column')
  const trips = row.querySelector('.trips-column')

  expect(time.innerHTML).toBe('00')
  expect(trips.innerHTML).toBe('111')
})

test('should format hours', () => {
  const data = [
    { time: 0, trips: 111 },
    { time: 11, trips: 111 }
  ]
  const element = render('trips-info', { data: data, appliedFilter: Filter.BY_HOUR })
  const times = element.querySelectorAll('.time-column')

  expect(times[0].innerHTML).toBe('00')
  expect(times[1].innerHTML).toBe('11')
})

test('should format weekdays', () => {
  const data = [
    { time: 1, trips: 111 },
    { time: 7, trips: 111 }
  ]
  const element = render('trips-info', { data: data, appliedFilter: Filter.BY_DAY_OF_WEEK })
  const times = element.querySelectorAll('.time-column')

  expect(times[0].innerHTML).toBe('Monday')
  expect(times[1].innerHTML).toBe('Sunday')
})

test('should not format monthdays', () => {
  const data = [
    { time: 1, trips: 111 },
    { time: 10, trips: 111 }
  ]
  const element = render('trips-info', { data: data, appliedFilter: Filter.BY_DAY_OF_MONTH })
  const times = element.querySelectorAll('.time-column')

  expect(times[0].innerHTML).toBe('1')
  expect(times[1].innerHTML).toBe('10')
})
