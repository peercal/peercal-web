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
    height: 25px;
    justify-content: space-between;
    font-size: 1.5em;
    padding: 10px;
    text-transform: uppercase;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
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
  }
`

const button = css`
  :host {
    margin-left: 10px;
    color: white;
  }
`

module.exports = ({ title, mode }, emit) => {
  return html`<div class=${outer}>
    <div>${title}</div>
    <div class=${rightButtons}>
      <div class=${modeButtons}>
        <a href='/'><div class=${button} style='color: ${mode === MODE_MONTHLY ? 'white' : '#888'}'>${'M'}</div></a>
        <a href='/weekly'><div class=${button} style='color: ${mode === MODE_WEEKLY ? 'white' : '#888'}'>${'W'}</div></a>
        <a href='/daily'><div class=${button} style='color: ${mode === MODE_DAILY ? 'white' : '#888'}'>${'D'}</div></a>
      </div>
      <div class=${button} onclick=${previous}>${'<'}</div>
      <div class=${button} onclick=${home}>${'H'}</div>
      <div class=${button} onclick=${next}>${'>'}</div>
    </div>
  </div>`

  function previous () { emit('toolbar:goto-previous') }
  function home () { emit('toolbar:goto-home') }
  function next () { emit('toolbar:goto-next') }
}
