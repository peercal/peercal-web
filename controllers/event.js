/**
 * Event controller
 */
module.exports = (state, emitter) => {
  state.event = null

  emitter.on('touch:longpress:event', (eventUrl, eventId) => {
    console.log('got longpress event event', eventUrl, eventId)
    // TODO set data .. umm .. get the event from allEvents?
    // emitter.emit('render')
  })
}
