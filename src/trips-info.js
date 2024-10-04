import { Filter } from './data.js'

const dayOfWeek = ["None", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export class TripsInfo extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'})
    this.root.innerHTML =`
<link rel="stylesheet" type="text/css" href="trips-info.css" />
<table>
  <thead>
    <tr>
      <th id="time-column">Hour</th>
      <th>Trips</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
`
  }

  set data(val) {
    this._data = val
    this.update()
  }

  set appliedFilter(val) {
    this._appliedFilter = val
    this.update()
  }

  update() {
    this.updateHeaders()
    this.updateData()
  }

  updateData() {
    if (!this._data) return

    const thresholds = this.thresholds(this._data)

    const rows = this._data.map((data) => this.createRow(data, thresholds), this)

    const tbody = this.root.querySelector('tbody')
    tbody.replaceChildren(...rows)
  }

  createRow(data, thresholds) {
    const [firstThreshold, secondThreshold] = thresholds
    
    const row = document.createElement('tr')
    row.className = 'data-row'

    const timeColumn = document.createElement('td')
    timeColumn.className = 'time-column'
    timeColumn.innerHTML = this.formatTime(data.time)

    const tripsColumn = document.createElement('td')
    tripsColumn.className = 'trips-column'
    if (data.trips < firstThreshold) tripsColumn.className += ' small'
    if (data.trips > secondThreshold) tripsColumn.className += ' big'
    tripsColumn.innerHTML = data.trips

    row.append(timeColumn, tripsColumn)

    return row
  }

  thresholds(data) {
    const [min, max] = data.reduce(
      (acc, current) => [Math.min(acc[0], current.trips), Math.max(acc[1], current.trips)],
      [Number.MAX_VALUE, 0])
    const diff = max - min
    
    return [min + (diff / 3), min + (diff * 2 / 3)]
  }

  formatTime(time) {
    if (this._appliedFilter === Filter.BY_HOUR) {
      return time.toLocaleString('en-US', { minimumIntegerDigits: 2 })
    } else if (this._appliedFilter === Filter.BY_DAY_OF_WEEK) {
      return dayOfWeek[time]
    } else {
      return time
    }
  }

  updateHeaders() {
    if (this._appliedFilter === Filter.BY_HOUR) {
      this.root.getElementById('time-column').innerHTML = 'Hour'
    } else {
      this.root.getElementById('time-column').innerHTML = 'Day'
    }
  }
}

customElements.define("trips-info", TripsInfo)
