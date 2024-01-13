/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react'
import type * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { syncedStore, getYjsValue, type SyncedDoc } from '@syncedstore/core'
// import type { MappedTypeDescription } from '@syncedstore/core/types/doc'
import { SocketProvider } from '@socket-editor/lib/socketProvider.ts'
import { useSocket } from './useSocket'

export declare type docElementTypeDescription = 'xml' | 'text' | Array<any> | object
export declare type DocTypeDescription = Record<string, docElementTypeDescription>
export declare type MappedTypeDescription<T extends DocTypeDescription> = {
  readonly [P in keyof T]: T[P] extends 'xml'
    ? Y.XmlFragment
    : T[P] extends 'text'
      ? Y.Text
      : T[P] extends Array<any>
        ? T[P]
        : T[P] extends object
          ? Partial<T[P]>
          : never
}

export type DocumentState = {
  content: 'xml'
}

type Connection = {
  doc: SyncedDoc
  store: MappedTypeDescription<DocumentState>
  indexedDbProvider: IndexeddbPersistence
  socketProvider: SocketProvider
  refCount: number
}
const connections = new Map<string, Connection>()

export const useDocumentState = (
  documentKey: string,
): [MappedTypeDescription<DocumentState> | undefined, SocketProvider | undefined] => {
  const socket = useSocket()

  const connection = useMemo(() => {
    const connection = connections.get(documentKey)
    if (socket == null || connection != null) {
      return connection
    }

    const store = syncedStore({
      content: 'xml',
    })
    const doc = getYjsValue(store) as SyncedDoc

    const newConnection: Connection = {
      doc,
      store,
      indexedDbProvider: new IndexeddbPersistence(documentKey, doc),
      socketProvider: new SocketProvider(socket, documentKey, doc),
      refCount: 0,
    }

    connections.set(documentKey, newConnection)

    return newConnection
  }, [documentKey, socket])

  useEffect(() => {
    if (connection == null) {
      return
    }

    connection.refCount++

    return () => {
      connection.refCount--
      if (connection.refCount < 1) {
        setTimeout(() => {
          if (connection.refCount < 1) {
            connection.socketProvider.destroy()
            void connection.indexedDbProvider.destroy()
            connection.doc.destroy()
            connections.delete(documentKey)
          }
        }, 1000)
      }
    }
  }, [documentKey, connection])

  return [connection?.store, connection?.socketProvider]
}
