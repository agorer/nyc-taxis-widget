import { TimeFilter } from './time-filter.js'
import { TripsInfo } from './trips-info.js'
import { Filter, loadData } from './data.js'

export class TripsWidget extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'})
    this.root.innerHTML = `
<link rel="stylesheet" type="text/css" href="trips-widget.css" />
<div class="widget">
  <time-filter></time-filter>
  <trips-info></trips-info>
</div>
`
    const filter = this.root.querySelector('time-filter')
    filter.onChange = this.loadFilteredData.bind(this)
    
    this.setDefaultFilter()
  }

  setDefaultFilter() {
    const filter = this.root.querySelector('time-filter')
    location.hash = location.hash || '#BY_DAY_OF_WEEK'
    filter.selectFilter(location.hash.substring(1))
  }

  async loadFilteredData(filter) {
    const info = this.root.querySelector('trips-info')
    info.appliedFilter = Filter[filter]
    info.data = await loadData(Filter[filter])
  }
}

customElements.define("trips-widget", TripsWidget)
