const html = require('choo/html')
const css = require('sheetify')
const ToolbarView = require('./toolbar.js')
const {
  calculateWeekNumber,
  isToday,
  WEEKDAYS,
  MONTHS
} = require('../lib/date.js')
const { pad } = require('../lib/util.js')

const EVENT_CUTOFF = 5

const headerCell = css`
  :host {
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    text-align: center;
    flex: 5;
    text-transform: uppercase;
  }
`

const dayCell = css`
  :host {
    flex: 5;
  }
`

const dateCell = css`
  :host {
    margin: 3px;
  }
`

const weekNumber = css`
  :host {
    width: 100%;
    min-width: 30px;
    text-align: center;
    display: flex;
    flex: 1;
  }
`

const eventContainer = css`
  :host {
    width: 0;
    min-width: 100%;
    height: 14px;
    font-size: 12px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

function datesEqual (lhs, rhs) {
  return (lhs.getFullYear() === rhs.getFullYear() &&
          lhs.getMonth() === rhs.getMonth() &&
          lhs.getDate() === rhs.getDate())
}

module.exports = (state, emit) => {
  const { year, month, selected, weeks } = state.monthly

  function cellStyle (day) {
    if (hasSolidBorder(day)) {
      return `
        background-color: ${day.date.getMonth() === month ? 'black' : '#222'};
        border: 1px solid ${borderColor(day)};
        z-index: 1;
      `
    } else {
      return `background-color: ${day.date.getMonth() === month ? 'black' : '#222'};`
    }
  }

  function hasSolidBorder (day) {
    return isToday(day.date) || (selected && datesEqual(selected, day.date))
  }

  function borderColor (day) {
    // TODO hardcoded colors for now -> should use theme
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
    ${ToolbarView(title, state, emit)}
    <table>
      <tbody>
        <tr style='display: flex;'>
          ${WEEKDAYS.map(weekday => html`<th class=${headerCell}>${weekday}</th>`)}
          <th class=${headerCell} style='flex: 1; min-width: 30px;'>W</th>
        </tr>
        ${weeks.map((week, weekIndex) => {
          return html`<tr style='display: flex; flex: 1;'>
            ${week.map(day => {
              const events = day.events
              const showEllipsis = events.length > EVENT_CUTOFF

              return html`<td data-type='day' data-date=${day.date} class=${dayCell} style=${cellStyle(day)} onclick=${() => emit('monthly:select-date', day.date)}>
                <div class=${dateCell}>${day.date.getDate()}</div>
                ${events.slice(0, EVENT_CUTOFF).map(event => {
                  const cstyle = `
                    background: ${event.background || '#bbb'};
                    color: ${event.color || 'black'};
                  `
                  const showTime = datesEqual(event.start, day.date)
                  return html`<div class=${eventContainer} style=${cstyle}>
                    ${showTime ? padTime(event.start) : ''} ${event.summary}
                  </div>`
                })}
                ${showEllipsis ? '...' : ''}
              </td>`
            })}
            <td data-type='week' data-date=${week[0].date} class=${weekNumber}>
              <div data-type='week' data-date=${week[0].date} style='align-self: center; width: 100%;'>
                ${padWeek(baseWeek + weekIndex)}
              </div>
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
