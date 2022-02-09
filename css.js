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
    border: 1px solid #999;
  }
`

const calendarHeaderTitle = css`
  :host {
    text-align: center;
  }
`

const weekdaysHeader = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid red;
    border-bottom: 1px solid red;
    border-left: 1px solid red;
  }
`
const weekdayHeaderCell = css`
  :host {
    width: inherit;
    text-align: center;
    border-right: 1px solid red;
    padding: 5px;
  }
`

module.exports = {
  body,
  calendar,
  calendarHeaderTitle,
  weekdaysHeader,
  weekdayHeaderCell
}
