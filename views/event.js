const html = require('choo/html')
// const css = require('sheetify')

// const foo = css`
//   :host {
//   }
// `

module.exports = (state, emit) => {
  console.log('EVENT RENDER')
  return html`<div>TODO edit event</div>`
}
