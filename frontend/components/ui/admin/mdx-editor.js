'use client'

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    linkPlugin,
    linkDialogPlugin,
    thematicBreakPlugin,
    tablePlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    StrikeThroughSupSubToggles,
    ListsToggle,
    BlockTypeSelect,
    CreateLink,
    InsertTable,
    InsertThematicBreak,
    Separator
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import './mdx-editor.css'
import styles from './mdx-editor.module.css'

// Only import this to the next file
export default function InitializedMDXEditor({
    editorRef,
    ...props
}) {
    return (
        <MDXEditor
            className={styles.editor}
            contentEditableClassName={styles.prose}
            plugins={[
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            {' '}
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <StrikeThroughSupSubToggles />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <BlockTypeSelect />
                            <Separator />
                            <CreateLink />
                            <InsertTable />
                            <InsertThematicBreak />
                        </>
                    )
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                thematicBreakPlugin(),
                tablePlugin(),
                markdownShortcutPlugin()
            ]}
            {...props}
            ref={editorRef}
        />
    )
}
