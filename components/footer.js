const html = require('choo/html')
const css = require('sheetify')

const footer = css`
  :host {
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
  }
`

module.exports = () => {
  return html`<div class=${footer}>
     <div>Made with <a href='https://www.choo.io/' target='new'>🚂</a></div>
  </div>`
}
