const html = require('choo/html')
const css = require('sheetify')

const { paddedTime } = require('../lib/date.js')
const { filterEvents } = require('../lib/ics.js')

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
    background: #bbb;
    color: black;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

module.exports = ({ month, weeks, selected, events }, emit) => {
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

  return html`<div class=${monthContainer}>
    ${weeks.map(week => (
      html`<div class=${weekContainer}>
        ${week.map(day => {
          const filtered = filterEvents(events, day.date)
          const cstyle = `
            background-color: ${day.date.getMonth() === month ? 'black' : '#111'};
            border: 1px solid ${borderColor(day)};
          `
          return html`<div class=${dayContainer}
                           onclick=${() => emit('monthly:select-date', day.date)}
                           style=${cstyle}>
            <div class=${dateContainer}>${day.date.getDate()}</div>
            ${filtered.map(event => {
              return html`<div class=${eventContainer}>
                ${paddedTime(event.DTSTART)} ${event.SUMMARY}
              </div>`
            })}
          </div>`
        })}
      </div>`
    ))}
  </div>`
}
