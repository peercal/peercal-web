const css = require('sheetify')

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
    font-size: 16px;
    padding: 10px;
  }
`

module.exports = {
  monthContainer,
  weekContainer,
  dayContainer
}
