const html = require('choo/html')
const css = require('sheetify')

const weekdaysHeader = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
  }
`

const weekdayHeaderCell = css`
  :host {
    width: inherit;
    text-align: center;
    border: 1px solid red;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
  }
`

module.exports = ({ weekdays }) => {
  return html`<div class=${weekdaysHeader}>
    ${weekdays.map(weekday => html`<div class=${weekdayHeaderCell}>${weekday}</div>`)}
  </div>`
}
