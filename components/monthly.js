const html = require('choo/html')
const css = require('sheetify')

const { paddedTime } = require('../lib/date.js')
const { filterEvents } = require('../lib/ics.js')
const WeekdaysHeaderView = require('./weekdays-header.js')

const EVENT_CUTOFF = 5

const monthContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 95px; /* TODO tweak this once borders are done */
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
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    padding: 5px;
    flex: 5;
  }
`

const weekNumberContainer = css`
  :host {
    width: 100%;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    font-size: 32px;
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

  return html`<div>
    ${WeekdaysHeaderView({ weekdays })}
    <div class=${monthContainer}>
      ${weeks.map(week => (
        html`<div class=${weekContainer}>
          ${week.map(day => {
            const filtered = filterEvents(events, day.date)
            const showEllipsis = filtered.length > EVENT_CUTOFF
            const cstyle = `
              background-color: ${day.date.getMonth() === month ? 'black' : '#222'};
              border: 1px solid ${borderColor(day)};
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
                  ${showTime ? paddedTime(event.DTSTART) : ''} ${event.SUMMARY}
                </div>`
              })}
              ${showEllipsis ? '...' : ''}
            </div>`
          })}
          <div class=${weekNumberContainer}><div style='align-self: center;'>09</div></div>
        </div>`
      ))}
    </div>
  </div>`
}
