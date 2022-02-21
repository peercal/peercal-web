const html = require('choo/html')
const css = require('sheetify')

// const { filterEvents } = require('../lib/ics.js')

const weekContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 45px; /* TODO tweak this once borders are done */
    bottom: 0px;
    display: flex;
    align-items: stretch;
  }
`

const dayColumn = css`
  :host {
    flex: 5;
    display: flex;
    flex-direction: column;
  }
`

const headerCell = css`
  :host {
    text-align: center;
    text-transform: uppercase;
    padding: 5px;
    border-top: 1px solid red;
    border-left: 1px solid red;
  }
`

const dayCell = css`
  :host {
    padding: 5px;
    height: 100%;
    border-top: 1px solid red;
    border-bottom: 1px solid red;
    border-left: 1px solid red;
  }
`

const timeColumn = css`
  :host {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const timeCell = css`
  :host {
    padding: 5px;
    height: 100%;
    border: 1px solid red;
  }
`

// TODO set dates at top of day columns
module.exports = ({ days, weekNumber, events }, emit) => {
  console.log('week data', days, weekNumber)
  return html`<div class=${weekContainer}>
    ${days.map(day => {
      const header = day.date.toDateString().split(' ').slice(0, 3).join(' ')
      return html`<div class=${dayColumn}>
        <div class=${headerCell}>${header}</div>
        <div class=${dayCell}>content</div>
      </div>`
    })}
    <div class=${timeColumn}>
      <div class=${headerCell} style='border-right: 1px solid red;'>time</div>
      <div class=${timeCell}>content</div>
    </div>
  </div>`
}
