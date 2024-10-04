export class TimeFilter extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'})
    this.root.innerHTML = `
<link rel="stylesheet" type="text/css" href="time-filter.css" />
<nav>
  <input type="radio" id="by-hour" name="time-filter" value="BY_HOUR" />
  <label for="by-hour">By hour</label>
  <input type="radio" id="by-weekday" name="time-filter" value="BY_DAY_OF_WEEK" />
  <label for="by-weekday">By weekday</label>
  <input type="radio" id="by-monthday" name="time-filter" value="BY_DAY_OF_MONTH" />
  <label for="by-monthday">By month day</label>
</nav>
`
    this.root.getElementById('by-hour')
      .addEventListener('click', (e) => this.selectFilter(e.currentTarget.value))
    this.root.getElementById('by-weekday')
      .addEventListener('click', (e) => this.selectFilter(e.currentTarget.value))
    this.root.getElementById('by-monthday')
      .addEventListener('click', (e) => this.selectFilter(e.currentTarget.value))
  }

  set onChange(val) {
    this._onChange = val
  }

  selectFilter(filter) {
    location.hash = `#${filter}`

    const selectedInput = this.root.querySelector(`input[value="${filter}"]`)
    selectedInput.checked = true
    
    if (this._onChange) {
      this._onChange(filter)
    }
  }
}

customElements.define("time-filter", TimeFilter)
