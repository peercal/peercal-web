const html = require('choo/html')
const ToolbarView = require('./toolbar.js')

module.exports = (state, emit) => {
  const { mode } = state
  const title = 'TODO daily'

  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView({ title, mode }, emit)}
  </div>`
}
