const html = require('choo/html')
const css = require('sheetify')
const ToolbarView = require('./toolbar.js')
const {
  weekDayIndex,
  startOfDay,
  endOfDay,
  isToday,
  MONTHS
} = require('../lib/date.js')
const { pad } = require('../lib/util.js')

const headerCell = css`
  :host {
    width: 100%;
    padding: 5px;
    text-align: center;
    flex: 5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const eventsArea = css`
  :host {
    position: absolute;
    top: 60px;
    bottom: 10px;
    left: 10px;
    right: 60px;
  }
`

const hourCell = css`
  :host {
    width: 100%;
    padding-left: 5px;
  }
`

const FILL = new Array(7).fill(null)
const HOURS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(i => `${pad(i)}-${pad((i + 2) % 24)}`)

function monthString (days) {
  const set = new Set()
  days.forEach(day => {
    set.add(MONTHS[day.date.getMonth()])
  })
  return Array.from(set).join('/')
}

module.exports = (state, emit) => {
  const { year, days, weekNumber, events } = state.weekly
  const title = `${year} ${monthString(days)} W${weekNumber}`

  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView(title, state, emit)}
    <table>
      <tbody style='z-index: 2;'>
        <tr style='display: flex; height: 25px;'>
          ${days.map((day, index) => {
            const cstyle = isToday(day.date) ? 'border: 1px solid yellow;' : ''
            return html`<th data-type='day' data-date=${day.date} class=${headerCell} style=${cstyle}>${day.date.getDate()}</th>`
          })}
          <th class=${headerCell} style='max-width: 50px; min-width: 50px;'>H</th>
        </tr>
        ${HOURS.map((hours, hourIndex) => {
          const lastColumnStyle = `
            display: flex;
            flex: 1;
            max-width: 50px;
            min-width: 50px;
            text-align: center;
          `
          return html`<tr style='display: flex; height: 100%;'>
            ${FILL.map(fill => html`<td class=${hourCell}></td>`)}
            <td class=${hourCell} style=${lastColumnStyle}>
              <div style='align-self: center; text-align: center;'>${hours}</div>
            </td>
          </tr>`
        })}
      </tbody>
    </table>
    <div class=${eventsArea}>
      ${events.map(renderDayEvent)}
    </div>
  </div>`
}

const eventCell = css`
  :host {
    position: absolute;
    min-height: 14px;
    font-size: 12px;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 3px;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

function renderDayEvent ({ day, event }, index) {
  const percentPerHour = 100 / 24
  const percentPerDay = 100 / 7

  const date = day.date
  const dayStart = startOfDay(date)
  const startDiff = Math.max((event.DTSTART - dayStart) / 1000 / 3600, 0)
  const top = startDiff * percentPerHour

  const dayEnd = endOfDay(date)
  const endDiff = Math.max((dayEnd - event.DTEND) / 1000 / 3600, 0)
  const bottom = endDiff * percentPerHour

  const dayIndex = weekDayIndex(date)
  const left = dayIndex * percentPerDay
  const right = (6 - dayIndex) * percentPerDay

  const cstyle = `
    background: ${event.background};
    color: ${event.color};
    top: ${top}%;
    bottom: ${bottom}%;
    left: ${left}%;
    right: ${right}%;
  `
  return html`<div class=${eventCell} style=${cstyle}>${event.SUMMARY}</div>`
}
