'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { Tree, getBackendOptions, MultiBackend } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'

import { TreeNode } from './tree-node'
import styles from './tree.module.css'
import { useEffect, useState } from 'react'

import { updateCategory } from '../queries'

export const DragPreview = (props) => {
    const item = props.monitorProps.item

    return (
        <Paper elevation={2} sx={{ m: 2, p: 1, display: "inline-flex", pointerEvents: null }}>{item.name}</Paper>
    )
}

const Placeholder = (props) => {
    const left = props.depth * 24
    return <Divider absolute sx={{ left, borderColor: "#4E97FD", borderBottomWidth: 3 }}></Divider>
}

export default function CategoryTree({ categories }) {
    const [ treeData, setTreeData ] = useState([])

    const handleDrop = (newTree, options) => {
        const formData = new FormData()
        formData.set('parent', options.dropTargetId)
        const dragSourceIndex = treeData.findIndex((item) => item.id === options.dragSourceId)
        if (options.destinationIndex === treeData.length - 1)
            formData.set('before', -1)
        else if (options.destinationIndex < dragSourceIndex)
            formData.set('before', treeData[options.destinationIndex].id)
        else
            formData.set('before', treeData[options.destinationIndex + 1].id)
        updateCategory(options.dragSourceId, {}, formData)
    }
    
    useEffect(() => {
        console.log(categories)
        const children = categories.reduce((children, category) => {
            children[category.id] ||= false
            if (category.parent !== null)
                children[category.parent] = true
            return children
        }, {})
        console.log(children)
        setTreeData(categories.map((category) => { return { ...category, text: category.name, children: children[category.id], droppable: true } }))
    }, [categories])

    return (
        <Box sx={{ p: 2 }}>
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <Tree
                    tree={treeData}
                    rootId={null}
                    render={(node, { depth, isOpen, onToggle }) => (
                        <TreeNode
                            node={node}
                            depth={depth}
                            isOpen={isOpen}
                            onToggle={onToggle}
                        />
                    )}
                    onDrop={handleDrop}
                    sort={false}
                    insertDroppableFirst={false}
                    dragPreviewRender={(monitorProps) => (
                        <DragPreview monitorProps={monitorProps} />
                    )}
                    canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                        if (dragSource?.parent === dropTargetId) {
                            return true
                        }
                    }}
                    dropTargetOffset={5}
                    placeholderRender={(node, { depth }) => (
                        <Placeholder node={node} depth={depth} />
                    )}
                    classes={{
                        draggingSource: styles.draggingSource,
                        placeholder: styles.placeholderContainer
                    }}
                />
            </DndProvider>
        </Box>
    )
}
