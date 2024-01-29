/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Y from 'yjs'
import { Observable } from 'lib0/observable'
import { Encryption } from 'socket:network'
import { applyAwarenessUpdate, Awareness, encodeAwarenessUpdate, removeAwarenessStates } from 'y-protocols/awareness.js'
import Buffer from 'socket:buffer'

const uint8ArrayToBuffer = (uint8array: Uint8Array): Buffer => {
  return Buffer.from(uint8array)
}

const bufferToUint8Array = (buffer: Buffer): Uint8Array => {
  // @ts-expect-error
  return Uint8Array.from(buffer)
}

export class SocketProvider extends Observable<string> {
  socket: any
  doc: Y.Doc
  awareness: Awareness
  subclusterId: string
  subcluster: any
  _verifyTimer: NodeJS.Timeout | null = null

  constructor(socket: any, subclusterId: string, doc: Y.Doc) {
    super()

    console.log('connect', socket.peer.peerId, 'to subcluster', subclusterId)

    this.socket = socket
    this.subclusterId = subclusterId
    this.doc = doc
    this.awareness = new Awareness(this.doc)

    void Encryption.createSharedKey(subclusterId).then((sharedKey: any) => {
      socket.subcluster({ sharedKey }).then((subcluster: any) => {
        this.subcluster = subcluster

        this.subcluster.on('verify', this._verifyHandler)
        this.subcluster.on('update', this._clusterUpdateHandler)
        this.doc.on('update', this._docUpdateHandler)
        this.subcluster.on('awareness', this._clusterAwarenessHandler)
        this.awareness.on('update', this._awarenessUpdateHandler)

        this._verifyTimer = setInterval(() => {
          console.log('send verify to all peers')
          this.subcluster.join()

          console.log(
            'current peers',
            Array.from(this.subcluster.peers.values()).map((peer: any) => peer.peerId),
          )

          const vector = uint8ArrayToBuffer(Y.encodeStateVector(this.doc))
          for (const peer of this.subcluster.peers.values()) {
            if (this.socket.peer.peerId != peer.peerId) {
              console.log('send verify from timer to', peer.peerId)
              peer.emit('verify', vector)
            }
          }
        }, 30_000)

        this.subcluster.on('#join', (peer: any) => {
          console.log('peer joined', peer.peerId)
        })

        // socket may send the join event before the subcluster is created,
        // so lets send it now that we are actually joined
        this.subcluster.join()
      })
    })
  }

  _verifyHandler = (vector?: Buffer) => {
    if (vector != null) {
      try {
        console.log('got verify for', this.subclusterId, vector != null, '...')
        const update = Y.encodeStateAsUpdate(this.doc, bufferToUint8Array(vector))

        if (update.byteLength > 2) {
          console.log('...found changes, so emit', update.byteLength)
          for (const peer of this.subcluster.peers.values()) {
            if (this.socket.peer.peerId != peer.peerId) {
              console.log('send update from verify to', peer.peerId)
              peer.emit('update', uint8ArrayToBuffer(update))
            }
          }
        }
      } catch (e) {
        console.error('encodeStateAsUpdate', e)
      }
    }
  }

  _clusterUpdateHandler = (update?: Buffer) => {
    if (update != null) {
      console.log('got document updated from', 'socket', 'for', this.subclusterId)
      try {
        Y.applyUpdate(this.doc, bufferToUint8Array(update), 'socket')
      } catch (e) {
        console.error('applyUpdate failed', e)
      }
    }
  }

  _docUpdateHandler = (update: Uint8Array, origin: any) => {
    if (origin !== 'socket') {
      console.log(
        'send document updated from',
        typeof origin === 'string' ? origin : 'provider',
        'for',
        this.subclusterId,
      )
      for (const peer of this.subcluster.peers.values()) {
        if (this.socket.peer.peerId != peer.peerId) {
          console.log('send update from doc to', peer.peerId)
          peer.emit('update', uint8ArrayToBuffer(update))
        }
      }
    }
  }

  _clusterAwarenessHandler = (update: Buffer) => {
    if (update != null) {
      console.log('got awareness update for', this.subclusterId)
      try {
        applyAwarenessUpdate(this.awareness, bufferToUint8Array(update), 'socket')
      } catch (e) {
        console.error('applyAwarenessUpdate failed', e)
      }
    }
  }

  _awarenessUpdateHandler = ({ added, updated, removed }: { added: []; updated: []; removed: [] }, origin: any) => {
    if (origin === 'local') {
      console.log('send awareness update from', origin, 'for', this.subclusterId)
      const update = encodeAwarenessUpdate(this.awareness, [...added, ...updated, ...removed])
      for (const peer of this.subcluster.peers.values()) {
        if (this.socket.peer.peerId != peer.peerId) {
          console.log('send awareness to', peer.peerId)
          peer.emit('awareness', uint8ArrayToBuffer(update), { ttl: 30_000 })
        }
      }
    }
  }

  destroy() {
    console.log('destroying socket provider')

    if (this._verifyTimer != null) {
      clearInterval(this._verifyTimer)
    }
    this.doc.off('update', this._docUpdateHandler)
    removeAwarenessStates(
      this.awareness,
      Array.from(this.awareness.getStates().keys()).filter((client) => client !== this.doc.clientID),
      'provider',
    )
    this.awareness.destroy()
    // this.cluster.removeListener('verify', this._verifyHandler)
    // this.cluster.removeListener('update', this._clusterUpdateHandler)
    // this.cluster.removeListener('awareness', this._clusterAwarenessHandler)
    super.destroy()
  }
}
