/**
 * Event controller
 */
module.exports = (state, emitter) => {
  state.event = null

  emitter.on('touch:longpress:event', (url, uid) => {
    const event = state.allEvents.find(ev => ev.url === url && ev.uid === uid)
    if (event) {
      state.event = { ...event }
      emitter.emit('pushState', '/event')
    } else {
      console.warn('failed to find event with id', uid)
    }
  })

  emitter.on('event:close', () => {
    state.event = null
    window.history.go(-1)
  })

  emitter.on('event:save', () => {
    // TODO
    // emitter.emit('render')
  })

  emitter.on('event:edit', () => {
    // TODO
    // emitter.emit('render')
  })
}
