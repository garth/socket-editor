import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { SocketProvider } from '@socket-editor/lib/socketProvider.ts'
import { createId } from '@socket-editor/lib/createId.js'
import { CLUSTER_ID_SEED } from '@socket-editor/lib/config.js'

export type Connection = {
  documentId: string
  document: Y.Doc
  indexedDbProvider: IndexeddbPersistence
  socketProviderPromise: Promise<SocketProvider>
}

const store = new Map<string, Connection>()

const createSocket = async () => {
  const socketNetwork = 'socket:network'
  const { network, Encryption } = await import(/* @vite-ignore */ socketNetwork)
  // set the peer id
  const peerId = window.localStorage.getItem('peerId') ?? (await Encryption.createId())
  console.log('peerId', peerId)
  window.localStorage.setItem('peerId', peerId)

  // set the signing keys
  const keySeed = window.localStorage.getItem('keySeed') ?? createId()
  window.localStorage.setItem('keySeed', keySeed)
  const signingKeys = await Encryption.createKeyPair(keySeed)

  // set the cluster id
  const clusterId = await Encryption.createClusterId(CLUSTER_ID_SEED)

  // create the network socket
  return network({ peerId, clusterId, signingKeys })
}
const socketPromise = createSocket()

export const connect = (documentId: string): Connection => {
  let connection = store.get(documentId)

  if (connection == null) {
    const document = new Y.Doc()
    connection = {
      documentId,
      document,
      indexedDbProvider: new IndexeddbPersistence(documentId, document),
      socketProviderPromise: socketPromise.then((socket) => new SocketProvider(socket, documentId, document)),
    }
    store.set(documentId, connection)
  }

  return connection
}
