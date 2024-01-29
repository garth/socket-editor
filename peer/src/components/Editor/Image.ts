/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Node, nodeInputRule } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/react'
import { Plugin } from 'prosemirror-state'

type UploadFn = (image: File) => Promise<string>

export const uploadAsDataURL = (file: File): Promise<string> => {
  const reader = new FileReader()
  return new Promise((accept, reject) => {
    reader.onload = () => accept(reader.result as string)
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

interface ImageOptions {
  inline: boolean
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType
    }
  }
}

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const Image = (uploadFn: UploadFn) => {
  return Node.create<ImageOptions>({
    name: 'image',

    addOptions() {
      return {
        inline: false,
        HTMLAttributes: {},
      }
    },

    inline() {
      return this.options.inline
    },

    group() {
      return this.options.inline ? 'inline' : 'block'
    },

    draggable: true,

    addAttributes() {
      return {
        src: {
          default: null,
        },
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
      }
    },
    parseHTML: () => [
      {
        tag: 'img[src]',
        getAttrs: (dom) => {
          if (typeof dom === 'string') {
            return {}
          }
          const element = dom as HTMLImageElement

          const obj = {
            src: element.getAttribute('src'),
            title: element.getAttribute('title'),
            alt: element.getAttribute('alt'),
          }
          return obj
        },
      },
    ],
    renderHTML: ({ HTMLAttributes }) => [
      'div',
      mergeAttributes(HTMLAttributes),
      ['img', mergeAttributes(HTMLAttributes)],
    ],

    addCommands() {
      return {
        setImage:
          (attrs) =>
          ({ state, dispatch }) => {
            const { selection } = state
            const position = selection.$head ? selection.$head.pos : selection.$to.pos

            const node = this.type.create(attrs)
            const transaction = state.tr.insert(position, node)
            return dispatch?.(transaction)
          },
      }
    },
    addInputRules() {
      return [
        nodeInputRule({
          find: IMAGE_INPUT_REGEX,
          type: this.type,
          getAttributes: (match) => {
            const [, alt, src, title] = match
            return {
              src,
              alt,
              title,
            }
          },
        }),
      ]
    },
    addProseMirrorPlugins() {
      return [uploadImagePlugin(uploadFn)]
    },
  })
}

const uploadImagePlugin = (upload: UploadFn) => {
  return new Plugin({
    props: {
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items ?? [])
        const { schema } = view.state

        items.forEach((item) => {
          const image = item.getAsFile()

          if (item.type.startsWith('image')) {
            event.preventDefault()

            if (upload && image) {
              void upload(image).then((src) => {
                const node = schema.nodes.image.create({
                  src,
                })
                const transaction = view.state.tr.replaceSelectionWith(node)
                view.dispatch(transaction)
              })
            }
          } else {
            const reader = new FileReader()
            reader.onload = (readerEvent) => {
              const node = schema.nodes.image.create({
                src: readerEvent.target?.result,
              })
              const transaction = view.state.tr.replaceSelectionWith(node)
              view.dispatch(transaction)
            }
            if (!image) {
              return
            }
            reader.readAsDataURL(image)
          }
        })

        return false
      },
      handleDOMEvents: {
        drop: (view, event: DragEvent) => {
          const hasFiles = event.dataTransfer?.files?.length

          if (!hasFiles) {
            return false
          }

          const images = Array.from(event.dataTransfer.files).filter((file) => /image/i.test(file.type))

          if (images.length === 0) {
            return false
          }

          event.preventDefault()

          const { schema } = view.state
          const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })

          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          images.forEach(async (image) => {
            const reader = new FileReader()

            if (upload) {
              const node = schema.nodes.image.create({
                src: await upload(image),
              })
              const transaction = view.state.tr.insert(coordinates!.pos, node)
              view.dispatch(transaction)
            } else {
              reader.onload = (readerEvent) => {
                const node = schema.nodes.image.create({
                  src: readerEvent.target?.result,
                })
                const transaction = view.state.tr.insert(coordinates!.pos, node)
                view.dispatch(transaction)
              }
              reader.readAsDataURL(image)
            }
          })
          return false
        },
      },
    },
  })
}
