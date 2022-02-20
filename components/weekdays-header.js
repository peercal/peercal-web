const html = require('choo/html')
const css = require('sheetify')

const outer = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
  }
`

const cell = css`
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
  return html`<div class=${outer}>
    ${weekdays.map(weekday => html`<div class=${cell} style='flex: 5;'>${weekday}</div>`)}
    <div class=${cell} style='flex: 1;'>week</div>
  </div>`
}
