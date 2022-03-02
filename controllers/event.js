/**
 * Event controller
 */
module.exports = (state, emitter) => {
  state.event = null

  emitter.on('touch:longpress:event', (url, uid) => {
    const event = state.allEvents.find(ev => ev.url === url && ev.uid === uid)
    if (event) {
      state.event = event
      emitter.emit('pushState', '/event')
    } else {
      console.warn('failed to find event with id', uid)
    }
  })

  // TODO add e.g. back or X-button
  emitter.on('event:close', () => {
    // TODO test
    state.event = null
    emitter.emit('popState')
  })

  // TODO add save button
  emitter.on('event:save', () => {
    // TODO
    // emitter.emit('render')
  })
}
