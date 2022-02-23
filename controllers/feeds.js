const { parseEvents } = require('../lib/ics.js')
const HyperdriveWatcher = require('./hyperdrive-watcher.js')

/**
 * Handle hyperdrive feeds.
 */
module.exports = (readOnlyFeeds) => {
  return (state, emitter) => {
    state.feeds = new Map()

    function addReadOnlyFeed ({ url, background, color }) {
      console.log('Adding read only feed', url)
      const watcher = HyperdriveWatcher(url, eventsFileWatcher)
      const feed = { events: [], watcher, background, color }
      state.feeds.set(url, feed)
    }

    function aggregateAllEvents () {
      let result = []
      for (const feed of state.feeds.values()) {
        const { background, color } = feed
        const events = feed.events.map(ev => {
          return { ...ev, background, color }
        })
        result = result.concat(events)
      }
      return result
    }

    function eventsFileWatcher ({ url, data }) {
      const feed = state.feeds.get(url)
      feed.events = parseEvents(data)
      state.allEvents = aggregateAllEvents()
      emitter.emit('feeds:update')
    }

    readOnlyFeeds.forEach(addReadOnlyFeed)
  }
}
