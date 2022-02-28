/**
 * Handle toolbar state changes
 */
module.exports = (state, emitter) => {
  state.toolbar = { showMenu: false }

  emitter.on('toolbar:menu:toggle', () => {
    state.toolbar.showMenu = !state.toolbar.showMenu
    emitter.emit('render')
  })
}
