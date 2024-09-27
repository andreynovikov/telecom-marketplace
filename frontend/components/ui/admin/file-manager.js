'use client'

import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort'

import { DragIndicator } from '@mui/icons-material'

import FileUpload from './file-upload'
import { useState, useEffect } from 'react'

import styles from './file-manager.module.css'

const DropTarget = () => {
    return <div className={styles.dropTarget} />
}


export default function FilesManager(props) {
    const { scope, instance } = props
    const [files, setFiles] = useState([])
    const [slots, setSlots] = useState(1)

    const getFiles = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FILES}/${scope}/${instance}`)
        const data = await res.json()
        setFiles(data)
    }

    const reorderFiles = async (reordered) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FILES}/reorder/${scope}/${instance}`, {
            method: 'PUT',
            headers: {
                //'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reordered)
        })
        const data = await res.json()
        setFiles(data)
    }

    const deleteFile = async (file) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FILES}/${scope}/${instance}/${file}`, {
            method: 'DELETE',
            headers: {
                //'Authorization': `Bearer ${session?.user?.access_token}`
            }
        })
        const data = await res.json()
        setFiles(data)
    }

    useEffect(() => {
        getFiles()
    }, [])

    const onSortEnd = (oldIndex, newIndex) => {
        if (oldIndex >= 0 && oldIndex < files.length) {
            const reordered = [...files]
            const [item] = reordered.splice(oldIndex, 1)
            reordered.splice(newIndex, 0, item)
            reorderFiles(reordered)
            setFiles(reordered)
        }
    }

    const onUpload = () => {
        getFiles()
        setSlots((slots) => slots + 1)
    }

    const onDelete = (fileName) => {
        const file = files.find((file) => file.name === fileName)
        if (file) {
            deleteFile(file.file)
            setSlots((slots) => slots + 1)
        }
    }

    return (
        <SortableList onSortEnd={onSortEnd} className={styles.list} draggedItemClassName={styles.dragged} dropTarget={<DropTarget />}>
            {files.map((file) => (
                <SortableItem key={file.id}>
                    <div className={styles.item}>
                        <FileUpload current={file} scope={scope} instance={instance} sx={{ pl: 4 }} onDelete={onDelete} />
                        <SortableKnob>
                            <div className={styles.knob}>
                                <DragIndicator />
                            </div>
                        </SortableKnob>
                    </div>
                </SortableItem>
            ))}
            <div key={slots} className={styles.item}>
                <FileUpload scope={scope} instance={instance} onUpload={onUpload} />
            </div>
        </SortableList>
    )
}
