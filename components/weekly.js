const html = require('choo/html')
const css = require('sheetify')

// const { weekNumber } = require('../lib/date.js')
// const { filterEvents } = require('../lib/ics.js')
const WeekdaysHeaderView = require('./weekdays-header.js')

const weekContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 95px; /* TODO tweak this once borders are done */
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`

module.exports = ({ weekdays, events }, emit) => {
  return html`<div>
    ${WeekdaysHeaderView({ weekdays, showWeek: false })}
    <div class=${weekContainer}>
    </div>
  </div>`
}
