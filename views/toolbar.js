const html = require('choo/html')
const css = require('sheetify')
const { MenuIcon } = require('./icons.js')

const outer = css`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: black;
    font-size: 1.7em;
    z-index: 3;
    padding-left: 10px;
    padding-right: 10px;
    text-transform: uppercase;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
`

// const modeButtons = css`
//   :host {
//     display: flex;
//     margin-right: 20px;
//   }
// `

const rightButtons = css`
  :host {
    display: flex;
  }
`

const button = css`
  :host {
    cursor: pointer;
    margin-left: 10px;
    color: white;
  }
`

/*
<div class=${modeButtons}>
<a href='/'><div class=${button} style='color: ${route === '/' ? 'white' : '#888'}'>${'M'}</div></a>
<a href='/weekly'><div class=${button} style='color: ${route === 'weekly' ? 'white' : '#888'}'>${'W'}</div></a>
<a href='/daily'><div class=${button} style='color: ${route === 'daily' ? 'white' : '#888'}'>${'D'}</div></a>
</div>
*/

module.exports = (title, state, emit) => {
  const { route } = state
  return html`<div class=${outer}>
    ${MenuIcon()}
    <div style='margin-left: 30px;'>${title}</div>
    <div class=${rightButtons}>
      <div class=${button} onclick=${previous}>${'<'}</div>
      <div class=${button} onclick=${home}>${'H'}</div>
      <div class=${button} onclick=${next}>${'>'}</div>
    </div>
  </div>`

  function previous () { emit(`${route === '/' ? 'monthly' : route}:toolbar:goto-previous`) }
  function home () { emit(`${route === '/' ? 'monthly' : route}:toolbar:goto-home`) }
  function next () { emit(`${route === '/' ? 'monthly' : route}:toolbar:goto-next`) }
}
