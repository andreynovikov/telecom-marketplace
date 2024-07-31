'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { createCategory, updateCategory, deleteCategory } from '../queries'

export default function CategoryEditDialog(props) {
    const { category, parent, open, setOpen } = props
    const updateCategoryWithId = updateCategory.bind(null, category?.id)
    const deleteCategoryWithId = deleteCategory.bind(null, category?.id)

    const [state, dispatch] = useFormState(category?.id ? updateCategoryWithId : createCategory, category || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            {parent && <input type="hidden" name="parent" value={parent} />}
            <DialogTitle variant="h6" component="h2">
                {category?.id ? 'Редактировать категорию' : 'Добавить категорию'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    required
                    autoFocus
                    name="name"
                    type="text"
                    label="Название"
                    margin="dense"
                    defaultValue={category?.name}
                    InputLabelProps={{ shrink: !!category?.name ? true : undefined }} />
            </DialogContent>
            <DialogActions>
                {category?.id && (
                    <Button color="error" type="submit" formAction={deleteCategoryWithId}>
                        Удалить
                    </Button>
                )}
                <Button type="submit">
                    {category?.id ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}