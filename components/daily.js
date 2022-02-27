const html = require('choo/html')
const ToolbarView = require('./toolbar.js')

module.exports = (state, emit) => {
  const title = 'TODO daily'
  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView(title, state, emit)}
  </div>`
}
