const html = require('choo/html')
const css = require('sheetify')

const calendarHeader = css`
  :host {
    display: flex;
    justify-content: center;
    font-size: 30px;
    margin-bottom: 20px;
    text-transform: uppercase;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
`

const calendarHeaderButton = css`
  :host {
    cursor: pointer;
  }
`

const calendarHeaderTitle = css`
  :host {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
`

module.exports = ({ year, month }, emit) => {
  return html`<div class=${calendarHeader}>
    <div class=${calendarHeaderButton} onclick=${gotoPrevMonth}>${'<'}</div>
    <div class=${calendarHeaderTitle}>${month} ${year}</div>
    <div class=${calendarHeaderButton} onclick=${gotoNextMonth}>${'>'}</div>
  </div>`

  function gotoPrevMonth () { emit('month:prev') }
  function gotoNextMonth () { emit('month:next') }
}
