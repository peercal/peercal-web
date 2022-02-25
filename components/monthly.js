const html = require('choo/html')
const css = require('sheetify')
const ToolbarView = require('./toolbar.js')
const {
  calculateWeekNumber,
  isToday,
  WEEKDAYS,
  MONTHS
} = require('../lib/date.js')

const EVENT_CUTOFF = 5

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
  }
`

const dayCell = css`
  :host {
    padding: 5px;
    flex: 5;
  }
`

const weekNumber = css`
  :host {
    width: 100%;
    min-width: 30px;
    padding: 5px;
    text-align: center;
    flex: 1;
    font-size: 18px;
    display: flex;
  }
`

const eventContainer = css`
  :host {
    width: 0;
    min-width: 100%;
    height: 16px;
    font-size: 12px;
    color: black;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

module.exports = (state, emit) => {
  const { mode } = state
  const { year, month, selected, weeks } = state.monthly

  function datesEqual (lhs, rhs) {
    return (lhs.getFullYear() === rhs.getFullYear() &&
            lhs.getMonth() === rhs.getMonth() &&
            lhs.getDate() === rhs.getDate())
  }

  function borderColor (day) {
    if (isToday(day.date)) {
      return 'yellow'
    } else if (selected && datesEqual(selected, day.date)) {
      return 'white'
    } else {
      return 'grey'
    }
  }

  const firstDay = weeks[0][0]
  const baseWeek = calculateWeekNumber(firstDay.date)

  const title = `${year} ${MONTHS[month]}`

  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView({ title, mode }, emit)}
    <table class=${table}>
    <tbody style='height: 100%; width: 100%; display: flex; flex-direction: column; align-items: stretch; border: 1px solid red;'>
      <tr style='display: flex;'>
        ${WEEKDAYS.map(weekday => html`<th class=${headerCell}>${weekday}</th>`)}
        <th class=${headerCell} style='flex: 1; min-width: 30px; border-right: 0px;'>W</th>
      </tr>
      ${weeks.map((week, weekIndex) => {
        const bottomBorderSize = weekIndex < weeks.length - 1 ? 1 : 0
        const lastColumnstyle = `border-bottom: ${bottomBorderSize}px dashed grey`
        return html`<tr style='display: flex; flex: 1;'>
          ${week.map(day => {
            const events = day.events
            const showEllipsis = events.length > EVENT_CUTOFF
            const color = borderColor(day)

            // TODO change this logic, ugly to compare colors
            let cstyle = null
            if (color === 'grey') {
              cstyle = `
                background-color: ${day.date.getMonth() === month ? 'black' : '#222'};
                border-bottom: ${bottomBorderSize}px dashed ${color};
                border-right: 1px dashed ${color};
                z-index: 0;
              `
            } else {
              cstyle = `
                background-color: ${day.date.getMonth() === month ? 'black' : '#222'};
                border: 1px solid ${color};
                z-index: 1;
              `
            }

            return html`<td class=${dayCell} style=${cstyle} onclick=${() => emit('monthly:select-date', day.date)}>
              <div>${day.date.getDate()}</div>
              ${events.slice(0, EVENT_CUTOFF).map(event => {
                const cstyle = `
                  background: ${event.background || '#bbb'};
                  color: ${event.color || 'black'};
                `
                const showTime = datesEqual(event.DTSTART, day.date)
                return html`<div class=${eventContainer} style=${cstyle}>
                  ${showTime ? padTime(event.DTSTART) : ''} ${event.SUMMARY}
                </div>`
              })}
              ${showEllipsis ? '...' : ''}
            </td>`
          })}
          <td class=${weekNumber} style=${lastColumnstyle}>
            <div style='align-self: center; width: 100%;'>${padWeek(baseWeek + weekIndex)}</div>
          </td>
        </tr>`
      })}
    </tbody>
  </table>
</div>`
}

function padTime (date) {
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`
}

function padWeek (week) {
  return pad(week <= 52 ? week : week % 52)
}

function pad (nr) {
  return nr < 10 ? `0${nr}` : nr
}
