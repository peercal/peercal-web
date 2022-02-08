const css = require('sheetify')

const body = css`
  :host {
    height: 100%;
    margin: 0px;
    overflow: hidden;
    font-family: monospace;
    background: black;
    color: white;
  }
`
const calendar = css`
  :host {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    color: white;
    border: 1px solid red;
  }
`
const calendarDays = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`
const calendarDay = css`
  :host {
    width: inherit;
    text-align: center;
    border: 1px solid red;
    padding: 5px;
  }
`

module.exports = {
  body,
  calendar,
  calendarDays,
  calendarDay
}
