const html = require('choo/html')
const css = require('sheetify')

const {
  weekDayIndex,
  startOfDay,
  endOfDay
} = require('../lib/date.js')

const mainContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 45px;
    bottom: 0px;
  }
`

const timeContainer = css`
  :host {
    position: absolute;
    left: 5px;
    top: 22px;
    bottom: -4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const headerContainer = css`
  :host {
    position: absolute;
    left: 30px;
    right: 0px;
    top: 0px;
    height: 30px;
    border-top: 1px solid red;
    border-left: 1px solid red;
    border-right: 1px solid red;
    display: flex;
    align-items: stretch;
  }
`

const dateCell = css`
  :host {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px;
  }
`

const gridContainer = css`
  :host {
    position: absolute;
    left: 30px;
    right: 0px;
    top: 29px;
    bottom: 0px;
    border: 1px solid red;
  }
`

const columnContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
`

const rowContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`

const rowCells = css`
  :host {
    display: flex;
    align-items: center;
    flex: 1;
  }
`

const eventContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  }
`

const eventCell = css`
  :host {
    position: absolute;
    min-height: 14px;
    font-size: 12px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    padding-top: 8px;
    background: #666;
    border: 3px solid black;
    border-radius: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0].map(pad)
const ROWS = new Array(24).fill(null)

module.exports = ({ days, weekNumber, dayEvents }, emit) => {
  // TODO how can we tweak the ui so events look okish when overlapping? each event should probably have
  // a unique color for a particular week, the border can be different depending on which dataset (or we can note
  // which dataset is being used in other ways)

  // TODO sort all events with longest duration first and set increasing z-index -> this should avoid or at least
  // mitgate having events overwriting each other, the longer events will be drawn first at a lower layer

  function renderDayEvent ({ day, event }) {
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

    const cstyle = `top: ${top}%; bottom: ${bottom}%; left: ${left}%; right: ${right}%;`
    return html`<div class=${eventCell} style=${cstyle}>${event.SUMMARY}</div>`
  }

  return html`<div class=${mainContainer}>
    <div class=${timeContainer}>
      ${HOURS.map((hour, index) => html`<div>${hour || ''}</div>`)}
    </div>
    <div class=${headerContainer}>
      ${days.map((day, index) => {
        const date = day.date.toDateString().split(' ').slice(0, 3).join(' ')
        const cstyle = `border-right: ${index < days.length - 1 ? 1 : 0}px solid red`
        return html`<div class=${dateCell} style=${cstyle}>${date}</div>`
      })}
    </div>
    <div class=${gridContainer}>
      <div class=${columnContainer}>
        ${days.map((day, index) => {
          const cstyle = `border-right: ${index < days.length - 1 ? 1 : 0}px dashed #555; flex: 1;`
          return html`<div style=${cstyle}></div>`
        })}
      </div>
      <div class=${rowContainer}>
        ${ROWS.map((row, index) => {
          const cstyle = `border-bottom: ${index < ROWS.length - 1 ? 1 : 0}px dashed #555;`
          return html`<div class=${rowCells} style=${cstyle}></div>`
        })}
      </div>
      <div class=${eventContainer}>
        ${dayEvents.map(renderDayEvent)}
      </div>
    </div>
  </div>`
}

function pad (nr) {
  return nr < 10 ? `0${nr}` : nr
}
