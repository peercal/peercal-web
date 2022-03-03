const html = require('choo/html')
const css = require('sheetify')

const mainContainer = css`
  :host {
    border: 2px solid blue;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const headerContainer = css`
  :host {
    border-bottom: 1px dashed grey;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }
`

const bodyContainer = css`
  :host {
    height: 100%;
  }
`

const button = css`
  :host {
    cursor: pointer;
    color: white;
    margin-left: 5px;
    font-size: 1.7em;
  }
`

const rightButtons = css`
  :host {
    display: flex;
  }
`

// TODO the edit button should not be there if the
// event is read only
// TODO save button should be visible when the edit
// button has been pressed, but grayed out
// TODO the save button should be enabled when the
// state is dirty
// TODO svg icons for edit and save buttons

module.exports = (state, emit) => {
  // TODO pulling event directly from allEvents for faster dev time
  // const { event } = state
  const uid = 'MlN8btK----21646140741358@tutanota.com'
  const event = state.allEvents.find(ev => ev.uid === uid)
  console.log(event)
  // window.EVENT = event
  return html`<div class=${mainContainer}>
    <div class=${headerContainer}>
      <div class=${button} onclick=${close}>${'<'}</div>
      <div class=${rightButtons}>
        <div class=${button} onclick=${save}>${'S'}</div>
        <div class=${button} onclick=${edit}>${'E'}</div>
      </div>
    </div>
    <div class=${bodyContainer}>
    </div>
  </div>`

  function close () { emit('event:close') }
  function save () { emit('event:save') }
  function edit () { emit('event:edit') }
}
