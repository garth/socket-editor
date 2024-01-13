/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEditor as useTipTapEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import DropCursor from '@tiptap/extension-dropcursor'
import GapCursor from '@tiptap/extension-gapcursor'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { type SyncedXml } from '@syncedstore/core'
import { Image, uploadAsDataURL } from '../components/Editor/Image'
import { type Awareness } from 'y-protocols/awareness'

export type Provider = {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  awareness: Awareness | null
}

export const useEditor = (
  provider: Provider,
  value: SyncedXml,
  user: {
    name: string
    color: string
  },
) => {
  const editor = useTipTapEditor({
    extensions: [
      Document,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Paragraph,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Bold,
      Italic,
      Underline,
      Superscript,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      DropCursor,
      GapCursor,
      Image(uploadAsDataURL),
      Collaboration.configure({
        fragment: value,
      }),
      CollaborationCursor.configure({
        provider,
        user,
      }),
    ],
  })

  return editor
}
