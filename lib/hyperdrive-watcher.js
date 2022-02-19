const path = require('path')
path.posix = path // work-around for https://github.com/andrewosh/mountable-hypertrie/pull/5

const Hyperdrive = require('hyperdrive')
const hyperswarm = require('hyperswarm-web')
// TODO use random-access-idb or random-access-web (if we can make it work)
const ram = require('random-access-memory')
const pump = require('pump')

// TODO move to config.js
const DEFAULT_SWARM_OPTS = {
  bootstrap: ['wss://hyperswarm.linkping.org']
}

module.exports = (url, onUpdate) => {
  const swarm = hyperswarm(DEFAULT_SWARM_OPTS)
  const [key, file] = url.split('hyper://').filter(Boolean)[0].split('/')
  const drive = new Hyperdrive(ram, key)

  drive.once('ready', () => {
    swarm.join(drive.discoveryKey)
    drive.watch('/')

    drive.on('update', () => {
      if (!file) return
      drive.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          console.error('drive.readFile() error', err.message)
        } else {
          onUpdate({ url, data })
        }
      })
    })
  })

  swarm.on('connection', (socket, info) => {
    const peer = info.peer
    pump(socket, drive.replicate(info.client), socket, (err) => {
      if (err) console.log('hyperdrive: pump ERROR', err.message)
    })
    socket.on('error', (err) => {
      console.log('hyperdrive: stream ERROR for peer', peer.host, err.message)
    })
  })

  // TODO return an object that can shut down the drive and the swarm
}
