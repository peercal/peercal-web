const html = require('choo/html')
const css = require('sheetify')

const outer = css`
  :host {
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin-bottom: 10px;
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
    color: #888;
  }
  :hover {
    color: white;
  }
`

module.exports = ({ title }, emit) => {
  return html`<div class=${outer}>
    <div class=${titleContainer}>${title}</div>
    <div class=${rightButtons}>
      <div class=${button} onclick=${gotoPrevMonth}>${'<'}</div>
      <div class=${button} onclick=${gotoHomeMonth}>${'H'}</div>
      <div class=${button} onclick=${gotoNextMonth}>${'>'}</div>
    </div>
  </div>`

  function gotoPrevMonth () { emit('monthly:goto-previous') }
  function gotoHomeMonth () { emit('monthly:goto-home') }
  function gotoNextMonth () { emit('monthly:goto-next') }
}
