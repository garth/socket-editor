import { Main } from '../Main'
import { type FunctionComponent } from 'react'
import { Panel } from '../Panel'
import { type Provider, useEditor } from '../../hooks/useEditor'
import { type SyncedXml } from '@syncedstore/core'
import { MenuBar } from './MenuBar'
import { EditorContent } from '@tiptap/react'

export const Editor: FunctionComponent<{
  value: SyncedXml
  provider: Provider
  presence: {
    name: string
    color: string
  }
}> = ({ provider, value, presence }) => {
  const editor = useEditor(provider, value, presence)

  return (
    <Main className="z-0">
      <div className="sticky top-0 z-10 bg-white px-4 py-2 shadow-sm sm:border-b sm:shadow-none">
        <MenuBar editor={editor} />
      </div>
      <Panel className="flex-grow sm:-mt-12 sm:pt-12">
        <EditorContent
          className="prose flex max-w-none flex-shrink-0 flex-grow flex-col leading-snug"
          editor={editor}
        />
      </Panel>
    </Main>
  )
}
