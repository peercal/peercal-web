const html = require('choo/html')
const css = require('sheetify')

const footer = css`
  :host {
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
  }
`

module.exports = () => {
  return html`<div class=${footer}>
     <div>Made with <a href='https://www.choo.io/' target='new'>🚂</a></div>
     <div><a href='https://github.com/peercal/peercal' target='new'><i>Code</i></a></div>
  </div>`
}
