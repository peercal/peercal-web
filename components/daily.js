const html = require('choo/html')
const ToolbarView = require('./toolbar.js')
const { MODE_DAILY } = require('../modes.js')

module.exports = (state, emit) => {
  const title = 'TODO daily'
  return html`<div style='display: flex; flex-direction: column;'>
    ${ToolbarView({ title, mode: MODE_DAILY }, emit)}
  </div>`
}
