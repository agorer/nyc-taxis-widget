const base_path = 'https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json'
const auth_token = 'p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c'

const query_by_hour = 'SELECT toHour(tpep_pickup_datetime) as time, count() as trips FROM _ group by time'
const query_by_weekday = 'SELECT toDayOfWeek(tpep_pickup_datetime) as time, count() as trips FROM _ group by time'
const query_by_monthday = 'SELECT toDayOfMonth(tpep_pickup_datetime) as time, count() as trips FROM _ group by time'

export const Filter = {
  BY_HOUR: query_by_hour,
  BY_DAY_OF_WEEK: query_by_weekday,
  BY_DAY_OF_MONTH: query_by_monthday,
}

function encodeParam(param) {
  return encodeURIComponent(param)
}

export async function loadData(filter) {
  const path = `${base_path}?token=${auth_token}&q=${encodeParam(filter)}`
  
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

