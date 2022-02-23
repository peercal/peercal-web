const html = require('choo/html')
const css = require('sheetify')
const { calculateWeekNumber } = require('../lib/date.js')

const EVENT_CUTOFF = 5

const table = css`
  :host {
    height: calc(100% - 50px);
    display: flex;
  }
`

const headerCell = css`
  :host {
    width: 100%;
    border: 1px solid red;
    padding: 5px;
    text-align: center;
    flex: 5;
    text-transform: uppercase;
  }
`

const dayCell = css`
  :host {
    width: 100%;
    border: 1px solid red;
    padding: 5px;
    flex: 5;
  }
`

const weekNumber = css`
  :host {
    width: 100%;
    min-width: 30px;
    border: 1px solid red;
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

module.exports = ({ month, weeks, selected, weekdays }, emit) => {
  const now = new Date()
  function isToday (date) {
    return (date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate())
  }

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
      return 'red'
    }
  }

  const firstDay = weeks[0][0]
  const baseWeek = calculateWeekNumber(firstDay.date)

  return html`<table class=${table}>
    <tbody style='height: 100%; width: 100%; display: flex; flex-direction: column; align-items: stretch; border: 1px solid red;'>
      <tr style='display: flex;'>
        ${weekdays.map(weekday => html`<th class=${headerCell}>${weekday}</th>`)}
        <th class=${headerCell} style='flex: 1; min-width: 30px;'>W</th>
      </tr>
      ${weeks.map((week, weekIndex) => (
        html`<tr style='display: flex; flex: 1;'>
          ${week.map(day => {
            const events = day.events
            const showEllipsis = events.length > EVENT_CUTOFF
            const color = borderColor(day)
            const zIndex = color === 'red' ? 0 : 1
            const cstyle = `
              background-color: ${day.date.getMonth() === month ? 'black' : '#222'};
              border: 1px solid ${color};
              z-index: ${zIndex};
            `
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
          <td class=${weekNumber}><div style='align-self: center; width: 100%;'>${padWeek(baseWeek + weekIndex)}</div></td>
        </tr>`
      ))}
    </tbody>
  </table>`
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
