const html = require('choo/html')
const css = require('sheetify')
const ToolbarView = require('./toolbar.js')
const {
  weekDayIndex,
  startOfDay,
  endOfDay,
  isToday
} = require('../lib/date.js')

const table = css`
  :host {
    display: flex;
    position: absolute;
    top: 30px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
  }
`

const headerCell = css`
  :host {
    width: 100%;
    border-right: 1px solid red;
    border-bottom: 1px solid red;
    padding: 5px;
    text-align: center;
    flex: 5;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const eventsArea = css`
  :host {
    position: absolute;
    top: 65px;
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

module.exports = (state, emit) => {
  const { mode } = state
  const { year, days, weekNumber, events } = state.weekly
  const title = `${year} WEEK ${weekNumber}`

  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView({ title, mode }, emit)}
    <table class=${table}>
      <tbody style='width: 100%; display: flex; flex-direction: column; border: 1px solid yellow;'>
        <tr style='display: flex; height: 25px;'>
          ${days.map((day, index) => {
            const date = day.date.toDateString().split(' ').slice(0, 3).join(' ')
            const cstyle = isToday(day.date) ? 'border: 1px solid yellow;' : ''
            return html`<th class=${headerCell} style=${cstyle}>${date}</th>`
          })}
          <th class=${headerCell} style='max-width: 50px; min-width: 50px;'>H</th>
        </tr>
        ${HOURS.map((hours, hourIndex) => {
          const bottomBorderSize = hourIndex < HOURS.length - 1 ? 1 : 0
          const cstyle = `
            border-bottom: ${bottomBorderSize}px dashed grey;
            border-right: 1px dashed grey;
          `
          const lastColumnStyle = `
            display: flex;
            flex: 1;
            max-width: 50px;
            min-width: 50px;
            text-align: center;
            border-bottom: ${bottomBorderSize}px dashed grey;
          `
          return html`<tr style='display: flex; height: 100%;'>
            ${FILL.map(fill => {
              return html`<td class=${hourCell} style=${cstyle}></td>`
            })}
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
    border: 1px solid white;
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
    z-index: ${(index + 1) * 100};
  `
  return html`<div class=${eventCell} style=${cstyle}>${event.SUMMARY}</div>`
}

function pad (nr) {
  return nr < 10 ? `0${nr}` : nr
}
