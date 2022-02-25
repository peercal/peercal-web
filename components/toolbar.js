const html = require('choo/html')
const css = require('sheetify')
const {
  MODE_MONTHLY,
  MODE_WEEKLY,
  MODE_DAILY
} = require('../modes.js')

const outer = css`
  :host {
    display: flex;
    justify-content: space-between;
    font-size: 2em;
    margin-bottom: 0.2em;
    text-transform: uppercase;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
`

const titleContainer = css`
  :host {
    margin-left: 5px
  }
`

const modeButtons = css`
  :host {
    display: flex;
    margin-right: 20px;
  }
`

const rightButtons = css`
  :host {
    display: flex;
    margin-right: 5px;
  }
`

const button = css`
  :host {
    cursor: pointer;
    margin-left: 10px;
    color: white;
  }
`

module.exports = ({ title, mode }, emit) => {
  return html`<div class=${outer}>
    <div class=${titleContainer}>${title}</div>
    <div class=${rightButtons}>
      <div class=${modeButtons}>
        <div class=${button} onclick=${setMonthlyMode} style='color: ${mode === MODE_MONTHLY ? 'white' : '#888'}'>${'M'}</div>
        <div class=${button} onclick=${setWeeklyMode} style='color: ${mode === MODE_WEEKLY ? 'white' : '#888'}'>${'W'}</div>
        <div class=${button} onclick=${setDailyMode} style='color: ${mode === MODE_DAILY ? 'white' : '#888'}'>${'D'}</div>
      </div>
      <div class=${button} onclick=${previous}>${'<'}</div>
      <div class=${button} onclick=${home}>${'H'}</div>
      <div class=${button} onclick=${next}>${'>'}</div>
    </div>
  </div>`

  function setMonthlyMode () { emit('toolbar:set-mode', MODE_MONTHLY) }
  function setWeeklyMode () { emit('toolbar:set-mode', MODE_WEEKLY) }
  function setDailyMode () { emit('toolbar:set-mode', MODE_DAILY) }

  function previous () { emit('toolbar:goto-previous') }
  function home () { emit('toolbar:goto-home') }
  function next () { emit('toolbar:goto-next') }
}
