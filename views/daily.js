const html = require('choo/html')
const css = require('sheetify')
const ToolbarView = require('./toolbar.js')
const { MONTHS } = require('../lib/date.js')
const { pad } = require('../lib/util.js')

const hourCell = css`
  :host {
    width: 100%;
    padding-left: 5px;
    display: flex;
    flex: 1;
    height: 75px;
    max-width: 50px;
    min-width: 50px;
    text-align: center;
  }
`

const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(i => `${pad(i)}-${pad((i + 1) % 24)}`)

module.exports = (state, emit) => {
  const { year, date } = state.daily
  const title = `${year} ${MONTHS[date.getMonth()]} ${date.getDate()}`

  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView(title, state, emit)}
    <table>
      <tbody style='overflow-y: auto;'>
        ${HOURS.map((hours, hourIndex) => {
          return html`<tr style='display: flex; height: 100%;'>
            <td style='width: 100%;'></td>
            <td class=${hourCell}>
              <div style='align-self: center; text-align: center;'>${hours}</div>
            </td>
          </tr>`
        })}
      </tbody>
    </table>
  </div>`
}
