const { parseEvents } = require('../lib/ics.js')
const HyperdriveWatcher = require('./hyperdrive-watcher.js')

/**
 * Handle hyperdrive feeds.
 */
module.exports = ({ feeds, swarmOpts }) => {
  return (state, emitter) => {
    state.feeds = new Map()

    function addReadOnlyFeed ({ url, background, color }) {
      console.log('Adding read only feed', url)
      const watcher = HyperdriveWatcher({ url, onFeedUpdate, swarmOpts })
      const feed = { events: [], watcher, background, color, url, readOnly: true }
      state.feeds.set(url, feed)
    }

    function aggregateAllEvents () {
      let result = []
      for (const feed of state.feeds.values()) {
        const { background, color, url, readOnly } = feed
        const events = feed.events.map(ev => {
          return { ...ev, background, color, url, readOnly }
        })
        result = result.concat(events)
      }
      return result
    }

    function onFeedUpdate ({ url, data }) {
      const feed = state.feeds.get(url)
      feed.events = parseEvents(data)
      state.allEvents = aggregateAllEvents()
      emitter.emit('feeds:update')
    }

    feeds.forEach(addReadOnlyFeed)
  }
}
