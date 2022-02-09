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
  }
`

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

const weekdaysHeader = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-transform: uppercase;
  }
`

const weekdayHeaderCell = css`
  :host {
    width: inherit;
    text-align: center;
    border: 1px solid red;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
  }
`

const monthContainer = css`
  :host {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 95px; /* TODO tweak this once borders are done */
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`

const weekContainer = css`
  :host {
    width: 100%;
    flex: 1;
    display: flex;
  }
`

const dayContainer = css`
  :host {
    width: 100%;
    border: 1px solid red;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
  }
`

module.exports = {
  body,
  calendar,
  calendarHeader,
  calendarHeaderButton,
  calendarHeaderTitle,
  weekdaysHeader,
  weekdayHeaderCell,
  monthContainer,
  weekContainer,
  dayContainer
}
