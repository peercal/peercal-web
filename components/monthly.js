const html = require('choo/html')
const css = require('sheetify')

const { calculateWeekNumber } = require('../lib/date.js')
const { filterEventsFromDate } = require('../lib/ics.js')

const EVENT_CUTOFF = 5

const monthContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 74px; /* TODO tweak this once borders are done */
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`

const weekContainer = css`
  :host {
    width: 100%;
    flex: 1;
    display: flex;
  }
`

const dayContainer = css`
  :host {
    width: 100%;
    margin-left: -1px;
    margin-bottom: -1px;
    font-size: 14px;
    padding: 5px;
    flex: 5;
  }
`

const weekNumberContainer = css`
  :host {
    min-width: 34px;
    margin-left: -1px;
    margin-bottom: -1px;
    font-size: 18px;
    padding: 5px;
    border: 1px solid red;
    flex: 1;
    display: flex;
    justify-content: center;
  }
`

const dateContainer = css`
  :host {
    font-size: 16px;
  }
`

const eventContainer = css`
  :host {
    height: 16px;
    padding-left: 2px;
    padding-right: 2px;
    font-size: 12px;
    color: black;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

module.exports = ({ month, weeks, selected, weekdays, events }, emit) => {
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

  return html`<div>
    ${WeekdaysHeader(weekdays)}
    <div class=${monthContainer}>
      ${weeks.map((week, weekIndex) => (
        html`<div class=${weekContainer}>
          ${week.map(day => {
            const filtered = filterEventsFromDate(events, day.date)
            const showEllipsis = filtered.length > EVENT_CUTOFF
            const color = borderColor(day)
            const zIndex = color === 'red' ? 0 : 1
            const cstyle = `
              background-color: ${day.date.getMonth() === month ? 'black' : '#222'};
              border: 1px solid ${color};
              z-index: ${zIndex};
            `
            return html`<div class=${dayContainer}
                             onclick=${() => emit('monthly:select-date', day.date)}
                             style=${cstyle}>
              <div class=${dateContainer}>${day.date.getDate()}</div>
              ${filtered.slice(0, EVENT_CUTOFF).map(event => {
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
            </div>`
          })}
          <div class=${weekNumberContainer}>
            <div style='align-self: center;'>${padWeek(baseWeek + weekIndex)}</div>
          </div>
        </div>`
      ))}
    </div>
  </div>`
}

const weekdaysOuter = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
  }
`

const weekdaysCell = css`
  :host {
    width: inherit;
    text-align: center;
    border: 1px solid red;
    padding: 5px;
    margin-left: -1px;
  }
`

function WeekdaysHeader (weekdays) {
  return html`<div class=${weekdaysOuter}>
    ${weekdays.map(weekday => html`<div class=${weekdaysCell} style='flex: 5;'>${weekday}</div>`)}
    <div class=${weekdaysCell} style='flex: 1;'>week</div>
  </div>`
}

function padTime (date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function padWeek (week) {
  return pad(week <= 52 ? week : week % 52)
}

function pad (nr) {
  return nr < 10 ? `0${nr}` : nr
}
