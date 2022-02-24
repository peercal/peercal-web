const html = require('choo/html')
const css = require('sheetify')

const {
  weekDayIndex,
  startOfDay,
  endOfDay
} = require('../lib/date.js')

const main = css`
  :host {
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: 0px solid yellow;
  }
`

const table = css`
  :host {
    display: flex;
    height: 100%;
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
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const eventsArea = css`
  :host {
    position: absolute;
    top: 25px;
    bottom: 0px;
    left: 0px;
    right: 60px;
  }
`

const hourCell = css`
  :host {
    width: 100%;
    padding: 5px;
    flex: 5;
  }
`

const FILL = new Array(7).fill(null)
const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(i => `${pad(i)}-${pad((i + 1) % 24)}`)

module.exports = ({ days, weekNumber, events }, emit) => {
  return html`<div class=${main}>
    <table class=${table}>
      <tbody style='height: 100%; width: 100%; display: flex; flex-direction: column; align-items: stretch; border: 1px solid red;'>
        <tr style='display: flex; height: 25px;'>
          ${days.map((day, index) => {
            const date = day.date.toDateString().split(' ').slice(0, 3).join(' ')
            return html`<th class=${headerCell}>${date}</th>`
          })}
          <th class=${headerCell} style='flex: 1; min-width: 50px;'>H</th>
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
            min-width: 50px;
            text-align: center;
            border-bottom: ${bottomBorderSize}px dashed grey;
          `
          return html`<tr style='display: flex; height: 100%;'>
            ${FILL.map(fill => {
              return html`<td class=${hourCell} style=${cstyle}></td>`
            })}
            <td class=${hourCell} style=${lastColumnStyle}>
              <div style='align-self: center; width: 100%;'>${hours}</div>
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
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    padding-top: 8px;
    border: 1px solid white;
    border-radius: 10px;
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
