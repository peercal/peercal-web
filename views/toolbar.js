const html = require('choo/html')
const css = require('sheetify')
const { MenuIcon } = require('./icons.js')

const toolbarStyle = css`
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

const rightButtons = css`
  :host {
    display: flex;
  }
`

const navigateButton = css`
  :host {
    cursor: pointer;
    color: white;
    margin-left: 10px;
  }
`

const menuItem = css`
  :host {
    cursor: pointer;
    color: white;
    font-size: 2em;
    margin-top: 10px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
`

const menuStyle = css`
  :host {
    position: absolute;
    top: 50px;
    cursor: pointer;
    background: black;
    color: white;
    z-index: 4;
    border: 1px dashed grey;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
  }
`

module.exports = (title, state, emit) => {
  const { route, toolbar } = state
  const { showMenu } = toolbar

  function renderMenu () {
    if (showMenu) {
      return html`<div id='hamburger-menu' class=${menuStyle}>
        <a href='/'><div class=${menuItem} onclick=${toggleMenu} style='color: ${route === '/' ? 'white' : '#888'}'>${'Monthly'}</div></a>
        <hr />
        <a href='/weekly'><div class=${menuItem} onclick=${toggleMenu} style='color: ${route === 'weekly' ? 'white' : '#888'}'>${'Weekly'}</div></a>
        <hr />
        <a href='/daily'><div class=${menuItem} onclick=${toggleMenu} style='color: ${route === 'daily' ? 'white' : '#888'}'>${'Daily'}</div></a>
      </div>`
    }
  }

  return html`<div>
    <div class=${toolbarStyle}>
      <div onclick=${toggleMenu}>${MenuIcon()}</div>
      <div style='margin-left: 30px;'>${title}</div>
      <div class=${rightButtons}>
        <div class=${navigateButton} onclick=${previous}>${'<'}</div>
        <div class=${navigateButton} onclick=${home}>${'H'}</div>
        <div class=${navigateButton} onclick=${next}>${'>'}</div>
      </div>
    </div>
    ${renderMenu()}
  </div>`

  function toggleMenu () { emit('toolbar:menu:toggle') }
  function previous () { emit(`${route === '/' ? 'monthly' : route}:toolbar:goto-previous`) }
  function home () { emit(`${route === '/' ? 'monthly' : route}:toolbar:goto-home`) }
  function next () { emit(`${route === '/' ? 'monthly' : route}:toolbar:goto-next`) }
}
