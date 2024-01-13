import { type ComponentProps, Fragment, type FunctionComponent, type MouseEventHandler, useMemo } from 'react'
import { type Editor as EditorClass } from '@tiptap/react'
import { MenuItem } from './MenuItem'

export const MenuBar: FunctionComponent<{ editor: EditorClass | null }> = ({ editor }) => {
  const items = useMemo<
    Array<
      | {
          icon: FunctionComponent<ComponentProps<'svg'>>
          title: string
          action: MouseEventHandler<HTMLButtonElement>
          isActive?: () => boolean
          type?: 'button'
        }
      | { type: 'divider' }
    >
  >(
    () =>
      editor == null
        ? []
        : [
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z"
                  />
                </svg>
              ),
              title: 'Heading 1',
              action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
              isActive: () => editor.isActive('heading', { level: 1 }),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z"
                  />
                </svg>
              ),
              title: 'Heading 2',
              action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
              isActive: () => editor.isActive('heading', { level: 2 }),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z"
                  />
                </svg>
              ),
              title: 'Heading 3',
              action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              isActive: () => editor.isActive('heading', { level: 3 }),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z"
                  />
                </svg>
              ),
              title: 'Paragraph',
              action: () => editor.chain().focus().setParagraph().run(),
              isActive: () => editor.isActive('paragraph'),
            },
            {
              type: 'divider',
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z"
                  />
                </svg>
              ),
              title: 'Bold',
              action: () => editor.chain().focus().toggleBold().run(),
              isActive: () => editor.isActive('bold'),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
                </svg>
              ),
              title: 'Italic',
              action: () => editor.chain().focus().toggleItalic().run(),
              isActive: () => editor.isActive('italic'),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z"
                  />
                </svg>
              ),
              title: 'Underline',
              action: () => editor.chain().focus().toggleUnderline().run(),
              isActive: () => editor.isActive('underline'),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z"
                  />
                </svg>
              ),
              title: 'Superscript',
              action: () => editor.chain().focus().toggleSuperscript().run(),
              isActive: () => editor.isActive('superscript'),
            },
            {
              type: 'divider',
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z"
                  />
                </svg>
              ),
              title: 'Align Left',
              action: () => editor.chain().focus().setTextAlign('left').run(),
              isActive: () => editor.isActive({ textAlign: 'left' }),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z"
                  />
                </svg>
              ),
              title: 'Align Center',
              action: () => editor.chain().focus().setTextAlign('center').run(),
              isActive: () => editor.isActive({ textAlign: 'center' }),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z"
                  />
                </svg>
              ),
              title: 'Align Right',
              action: () => editor.chain().focus().setTextAlign('right').run(),
              isActive: () => editor.isActive({ textAlign: 'right' }),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z"
                  />
                </svg>
              ),
              title: 'Align Justify',
              action: () => editor.chain().focus().setTextAlign('justify').run(),
              isActive: () => editor.isActive({ textAlign: 'justify' }),
            },
            {
              type: 'divider',
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
                  />
                </svg>
              ),
              title: 'Bullet List',
              action: () => editor.chain().focus().toggleBulletList().run(),
              isActive: () => editor.isActive('bulletList'),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z"
                  />
                </svg>
              ),
              title: 'Ordered List',
              action: () => editor.chain().focus().toggleOrderedList().run(),
              isActive: () => editor.isActive('orderedList'),
            },
            {
              type: 'divider',
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                </svg>
              ),
              title: 'Blockquote',
              action: () => editor.chain().focus().toggleBlockquote().run(),
              isActive: () => editor.isActive('blockquote'),
            },
            {
              type: 'divider',
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18,14H20V17H23V19H20V22H18V19H15V17H18V14M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z"
                  />
                </svg>
              ),
              title: 'Insert Table',
              action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M13,2A2,2 0 0,0 11,4V20A2,2 0 0,0 13,22H22V2H13M20,10V14H13V10H20M20,16V20H13V16H20M20,4V8H13V4H20M9,11H6V8H4V11H1V13H4V16H6V13H9V11Z"
                  />
                </svg>
              ),
              title: 'Add Column Before',
              action: () => editor.chain().focus().addColumnBefore().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z"
                  />
                </svg>
              ),
              title: 'Add Column After',
              action: () => editor.chain().focus().addColumnAfter().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4,2H11A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M17.59,12L15,9.41L16.41,8L19,10.59L21.59,8L23,9.41L20.41,12L23,14.59L21.59,16L19,13.41L16.41,16L15,14.59L17.59,12Z"
                  />
                </svg>
              ),
              title: 'Delete Column',
              action: () => editor.chain().focus().deleteColumn().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22,14A2,2 0 0,0 20,12H4A2,2 0 0,0 2,14V21H4V19H8V21H10V19H14V21H16V19H20V21H22V14M4,14H8V17H4V14M10,14H14V17H10V14M20,14V17H16V14H20M11,10H13V7H16V5H13V2H11V5H8V7H11V10Z"
                  />
                </svg>
              ),
              title: 'Add Row Before',
              action: () => editor.chain().focus().addRowBefore().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z"
                  />
                </svg>
              ),
              title: 'Add Row After',
              action: () => editor.chain().focus().addRowAfter().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9.41,13L12,15.59L14.59,13L16,14.41L13.41,17L16,19.59L14.59,21L12,18.41L9.41,21L8,19.59L10.59,17L8,14.41L9.41,13M22,9A2,2 0 0,1 20,11H4A2,2 0 0,1 2,9V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V9M4,9H8V6H4V9M10,9H14V6H10V9M16,9H20V6H16V9Z"
                  />
                </svg>
              ),
              title: 'Delete Row',
              action: () => editor.chain().focus().deleteRow().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z"
                  />
                </svg>
              ),
              title: 'Merge Cells',
              action: () => editor.chain().focus().mergeCells().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 14H21V20H3V14H5V18H19V14M3 4V10H5V6H19V10H21V4H3M11 11V13H8V15L5 12L8 9V11H11M16 11V9L19 12L16 15V13H13V11H16Z"
                  />
                </svg>
              ),
              title: 'Split Cells',
              action: () => editor.chain().focus().splitCell().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 448 512">
                  <path
                    fill="currentColor"
                    d="M448 448c0 17.69-14.33 32-32 32h-96c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-144h-224v144H128c17.67 0 32 14.31 32 32s-14.33 32-32 32H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-320H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32H112v112h224v-112H320c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32h-16v320H416C433.7 416 448 430.3 448 448z"
                  />
                </svg>
              ),
              title: 'Header Cell',
              action: () => editor.chain().focus().toggleHeaderCell().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4 3H18C19.11 3 20 3.9 20 5V12.08C18.45 11.82 16.92 12.18 15.68 13H12V17H13.08C12.97 17.68 12.97 18.35 13.08 19H4C2.9 19 2 18.11 2 17V5C2 3.9 2.9 3 4 3M4 7V11H10V7H4M12 7V11H18V7H12M4 13V17H10V13H4M17.75 21L15 18L16.16 16.84L17.75 18.43L21.34 14.84L22.5 16.25L17.75 21"
                  />
                </svg>
              ),
              title: 'Fix Tables',
              action: () => editor.chain().focus().fixTables().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.46,15.88L16.88,14.46L19,16.59L21.12,14.46L22.54,15.88L20.41,18L22.54,20.12L21.12,21.54L19,19.41L16.88,21.54L15.46,20.12L17.59,18L15.46,15.88M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z"
                  />
                </svg>
              ),
              title: 'Delete Table',
              action: () => editor.chain().focus().deleteTable().run(),
            },
            {
              type: 'divider',
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"
                  />
                </svg>
              ),
              title: 'Undo',
              action: () => editor.chain().focus().undo().run(),
            },
            {
              icon: (props) => (
                <svg {...props} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"
                  />
                </svg>
              ),
              title: 'Redo',
              action: () => editor.chain().focus().redo().run(),
            },
          ],
    [editor],
  )

  return (
    <div className="flex flex-shrink-0 flex-grow-0 flex-row flex-wrap">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? <div className="mx-2 my-1 h-5 w-px bg-gray-300" /> : <MenuItem {...item} />}
        </Fragment>
      ))}
    </div>
  )
}
