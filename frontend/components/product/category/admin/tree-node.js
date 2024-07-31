import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useDragOver } from '@minoru/react-dnd-treeview'

import { IconChevronRight, IconPoint, IconPlaylistAdd } from '@tabler/icons-react'
import { EditIcon, DeleteIcon, makeSvgIcon } from '@/theme/icons'

import CategoryEditDialog from './form'
import styles from './tree-node.module.css'

import { deleteCategory } from '../queries'

const ArrowRightIcon = (props) => makeSvgIcon(IconChevronRight, props)
const PointIcon = (props) => makeSvgIcon(IconPoint, props)
const AddItemIcon = (props) => makeSvgIcon(IconPlaylistAdd, props)

export const TreeNode = (props) => {
    const { node, depth, isOpen, onToggle } = props
    const [categoryEditOpen, setCategoryEditOpen] = useState(false)
    const [categoryAddOpen, setCategoryAddOpen] = useState(false)
    const [error, setError] = useState()

    const indent = depth * 24

    const handleToggle = (e) => {
        e.stopPropagation()
        onToggle(node.id)
    }

    const handleEdit = () => {
        setCategoryEditOpen(true)
    }

    const handleDelete = () => {
        deleteCategory(node.id).then((result) => {
            if (result?.error)
                setError(result.error)
        })
    }

    const handleAdd = () => {
        setCategoryAddOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setError(undefined)
    }

    const dragOverProps = useDragOver(node.id, isOpen, onToggle)

    return (
        <>
            <Stack direction="row" alignItems="center" {...dragOverProps} className="tree-node" style={{ paddingInlineStart: indent }}>
                <div className={`${styles.expandIconWrapper} ${isOpen ? styles.isOpen : ""}`}>
                    {node.children ? (
                        <div onClick={handleToggle}>
                            <ArrowRightIcon fontSize="small" />
                        </div>
                    ) : (
                        <div>
                            <PointIcon fontSize="small" />
                        </div>
                    )}
                </div>
                <Stack direction="row" alignItems="center">
                    <Typography sx={{ mr: 1 }}>
                        {node.name}
                    </Typography>
                    <IconButton onClick={handleEdit} size="small">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleDelete} size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleAdd} size="small">
                        <AddItemIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>
            <CategoryEditDialog category={node} open={categoryEditOpen} setOpen={setCategoryEditOpen} />
            <CategoryEditDialog parent={node.id} open={categoryAddOpen} setOpen={setCategoryAddOpen} />
            <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose} message={error} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}
