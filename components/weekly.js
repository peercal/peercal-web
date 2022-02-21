const html = require('choo/html')
const css = require('sheetify')

// const { filterEvents } = require('../lib/ics.js')

const mainContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 45px;
    bottom: 0px;
  }
`

const headerContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
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
    left: 0px;
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

const hourCells = css`
  :host {
    display: flex;
    align-items: center;
    flex: 1;
  }
`

const hourCell = css`
  :host {
    color: #444;
    width: 100%;
    text-align: center;
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
    font-size: 16px;
    padding: 5px;
    padding-top: 8px;
    background: #666;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const percentPerHour = 100 / 24
const percentPerDay = 100 / 7
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(h => `${pad(h)}:00`)

/*
module.exports = ({ days, weekNumber, events }, emit) => {
  // TODO events
  // 1. top is the amount of hours from beginning of day times percentPerHour (note that it can be negative if the event
  // starts days before the current day, in which case the distance is 0% from the top)
  // 2. bottom is the mount of hours from the end of the event to the end of the day times percentPerHour (note that it can be
  // negative if the event ends on a day after the current day, in which case the distance is also 0% from the bottom)
  // 3. left is the day index times percentPerDay
  // 4. right is 6 minus the day index times percentPerDay
  return html`<div class=${mainContainer}>
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
        ${hours.map((hour, index) => {
          const cstyle = `border-bottom: ${index < hours.length - 1 ? 1 : 0}px dashed #555;`
          return html`<div class=${hourCells} style=${cstyle}>
            ${days.map((day, index) => html`<div class=${hourCell}>${hour}</div>`)}
          </div>`
        })}
      </div>
      <div class=${eventContainer}>
        <div class=${eventCell} style='top: ${0}%; bottom: ${(24 - 1) * percentPerHour}%; left: 0%; right: ${(6 - 0) * percentPerDay}%;'>0am, 1h long</div>
        <div class=${eventCell} style='top: ${1 * percentPerHour}%; bottom: ${(24 - 2) * percentPerHour}%; left: ${1 * percentPerDay}%; right: ${(6 - 1) * percentPerDay}%'>1am event</div>
        <div class=${eventCell} style='top: ${5 * percentPerHour}%; bottom: ${(24 - 8) * percentPerHour}%; left: ${3 * percentPerDay}%; right: ${(6 - 3) * percentPerDay}%'>5am - 8am event - lets have a long text here bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla hej hej hej hej hej <br> hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hej hej hej</div>
      </div>
    </div>
  </div>`
}
*/

module.exports = ({ days, weekNumber, events }, emit) => {
  return html`<div class=${mainContainer}>
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
        ${hours.map((hour, index) => {
          const cstyle = `border-bottom: ${index < hours.length - 1 ? 1 : 0}px dashed #555;`
          return html`<div class=${hourCells} style=${cstyle}>
            ${days.map((day, index) => html`<div class=${hourCell}>${hour}</div>`)}
          </div>`
        })}
      </div>
      <div class=${eventContainer}>
        <div class=${eventCell} style='top: ${0}%; bottom: ${(24 - 1) * percentPerHour}%; left: 0%; right: ${(6 - 0) * percentPerDay}%;'>0am, 1h long</div>
        <div class=${eventCell} style='top: ${1 * percentPerHour}%; bottom: ${(24 - 2) * percentPerHour}%; left: ${1 * percentPerDay}%; right: ${(6 - 1) * percentPerDay}%'>1am event</div>
        <div class=${eventCell} style='top: ${5 * percentPerHour}%; bottom: ${(24 - 8) * percentPerHour}%; left: ${3 * percentPerDay}%; right: ${(6 - 3) * percentPerDay}%'>5am - 8am event - lets have a long text here bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla hej hej hej hej hej <br> hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hejhej hej hej hej hej hej hej</div>
      </div>
    </div>
  </div>`
}

function pad (nr) {
  return nr < 10 ? `0${nr}` : nr
}
