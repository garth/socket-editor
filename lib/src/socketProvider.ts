/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Y from 'yjs'
import { Observable } from 'lib0/observable'
import { Encryption } from 'socket:network'
import { applyAwarenessUpdate, Awareness, encodeAwarenessUpdate, removeAwarenessStates } from 'y-protocols/awareness.js'
import { Buffer } from 'buffer'

const uint8ArrayToBuffer = (uint8array: Uint8Array): Buffer => {
  return Buffer.from(uint8array)
}

const bufferToUint8Array = (buffer: Buffer): Uint8Array => {
  return Uint8Array.from(buffer)
}

export class SocketProvider extends Observable<string> {
  doc: Y.Doc
  awareness: Awareness
  cluster: any
  _verifyTimer: NodeJS.Timeout | null = null

  constructor(socket: any, roomname: string, doc: Y.Doc) {
    super()

    console.log('connect to room', roomname)

    this.doc = doc
    this.awareness = new Awareness(this.doc)

    void Encryption.createSharedKey(roomname).then((sharedKey) => {
      socket.subcluster({ sharedKey }).then((cluster: any) => {
        this.cluster = cluster

        this.cluster.on('verify', this._verifyHandler)
        this.cluster.on('update', this._clusterUpdateHandler)
        this.doc.on('update', this._docUpdateHandler)
        this.cluster.on('awareness', this._clusterAwarenessHandler)
        this.awareness.on('update', this._awarenessUpdateHandler)

        this._verifyTimer = setInterval(() => {
          this.cluster.emit('verify', uint8ArrayToBuffer(Y.encodeStateVector(this.doc)))
        }, 30_000)
      })
    })
  }

  _verifyHandler = (vector?: Buffer) => {
    if (vector != null) {
      try {
        const update = Y.encodeStateAsUpdate(this.doc, bufferToUint8Array(vector))

        console.log('asked to verify')

        this.cluster.emit('update', uint8ArrayToBuffer(update))
      } catch (e) {
        console.error('encodeStateAsUpdate', e)
      }
    }
  }

  _clusterUpdateHandler = (update?: Buffer) => {
    if (update != null) {
      console.log('got document updated from', 'socket')
      try {
        Y.applyUpdate(this.doc, bufferToUint8Array(update), 'socket')
      } catch (e) {
        console.error('applyUpdate failed', e)
      }
    }
  }

  _docUpdateHandler = (update: Uint8Array, origin: any) => {
    if (origin !== 'socket') {
      console.log('send document updated from', typeof origin === 'string' ? origin : 'provider')

      this.cluster.emit('update', uint8ArrayToBuffer(update))
    }
  }

  _clusterAwarenessHandler = (update: Buffer) => {
    if (update != null) {
      console.log('got awareness update')
      try {
        applyAwarenessUpdate(this.awareness, bufferToUint8Array(update), 'socket')
      } catch (e) {
        console.error('applyAwarenessUpdate failed', e)
      }
    }
  }

  _awarenessUpdateHandler = ({ added, updated, removed }: { added: []; updated: []; removed: [] }, origin: any) => {
    if (origin === 'local') {
      console.log('send awareness update from', origin)
      const update = encodeAwarenessUpdate(this.awareness, [...added, ...updated, ...removed])

      this.cluster.emit('awareness', uint8ArrayToBuffer(update))
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
    // this.cluster.destroy() // no documentation on this
    super.destroy()
  }
}
