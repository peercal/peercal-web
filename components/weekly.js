const html = require('choo/html')
const css = require('sheetify')

// const { weekNumber } = require('../lib/date.js')
// const { filterEvents } = require('../lib/ics.js')

// TODO make sure top of weekContainer matches montly container
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
module.exports = ({ week, events }, emit) => {
  console.log('week data', week)
  return html`<div class=${weekContainer}>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${dayColumn}>
      <div class=${headerCell}>mon</div>
      <div class=${dayCell}>content</div>
    </div>
    <div class=${timeColumn}>
      <div class=${headerCell} style='border-right: 1px solid red;'>time</div>
      <div class=${timeCell}>content</div>
    </div>
  </div>`
}
