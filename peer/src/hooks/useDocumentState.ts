/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import type * as Y from 'yjs'
import { syncedStore } from '@syncedstore/core'
import { type Connection, connect } from '../store'

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

export const useDocumentState = (
  presentationKey: string,
): Connection & { state: MappedTypeDescription<DocumentState> } => {
  const connection = useMemo(() => {
    const connection = connect(presentationKey)
    return {
      ...connection,
      state: syncedStore<DocumentState>(
        {
          content: 'xml',
        },
        connection.document,
      ),
    }
  }, [presentationKey])

  return connection
}
