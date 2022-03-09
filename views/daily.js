const html = require('choo/html')
const css = require('sheetify')
const ToolbarView = require('./toolbar.js')
const {
  startOfDay,
  endOfDay,
  MONTHS
} = require('../lib/date.js')
const { pad } = require('../lib/util.js')

const hourCell = css`
  :host {
    display: flex;
    padding-right: 5px;
    height: 75px;
  }
`

const eventsArea = css`
  :host {
    position: absolute;
    left: 10px;
    right: 60px;
    height: 1800px;
  }
`

const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(i => `${pad(i)}-${pad((i + 1) % 24)}`)
const PIXELS_PER_HOUR = 1800 / 24

module.exports = (state, emit) => {
  const { year, date, events } = state.daily
  const title = `${year} ${MONTHS[date.getMonth()]} ${date.getDate()}`
  const numberOfEvents = events.length

  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView(title, state, emit)}
    <table style='overflow-y: auto;'>
      <thead>
        <div class=${eventsArea}>
          ${events.map((event, index) => renderDayEvent(date, event, index, numberOfEvents))}
        </div>
      </thead>
      <tbody>
        ${HOURS.map((hours, hourIndex) => {
          return html`<tr>
            <td class=${hourCell}>
              <div style='text-align: right; width: 100%; align-self: center;'>${hours}</div>
            </td>
          </tr>`
        })}
      </tbody>
    </table>
  </div>`
}

const eventCell = css`
  :host {
    position: absolute;
    font-size: 12px;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 10px;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 90%;
  }
`

function renderDayEvent (date, event, index, numberOfEvents) {
  const dayStart = startOfDay(date)
  const startDiff = Math.max((event.start - dayStart) / 1000 / 3600, 0)
  const top = startDiff * PIXELS_PER_HOUR

  const dayEnd = endOfDay(date)
  const endDiff = Math.max((dayEnd - event.end) / 1000 / 3600, 0)
  const bottom = endDiff * PIXELS_PER_HOUR

  // TODO we should only adjust left if an event is intersecting another
  // event, otherwise it can just follow the other event in time

  const cstyle = `
    background: ${event.background};
    color: ${event.color};
    top: ${top}px;
    bottom: ${bottom}px;
    width: ${100 / numberOfEvents}%;
    left: ${index / numberOfEvents * 100}%;
  `
  return html`<div data-event-url=${event.url} data-event-id=${event.uid} data-type='event' class=${eventCell} style=${cstyle}>${event.summary}</div>`
}
