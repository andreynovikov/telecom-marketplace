'use client'

import { useEffect, useActionState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { createBrand, updateBrand, deleteBrand } from '../queries'

export default function BrandEditDialog(props) {
    const { brand, open, setOpen } = props
    const updateBrandWithId = updateBrand.bind(null, brand?.id)
    const deleteBrandWithId = deleteBrand.bind(null, brand?.id)

    const [state, dispatch] = useActionState(brand?.id ? updateBrandWithId : createBrand, brand || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                {brand?.id ? 'Редактировать бренд' : 'Добавить бренд'}
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
                    defaultValue={brand?.name}
                    InputLabelProps={{ shrink: !!brand?.name ? true : undefined }} />
            </DialogContent>
            <DialogActions>
                {brand?.id && (
                    <Button color="error" type="submit" formAction={deleteBrandWithId}>
                        Удалить
                    </Button>
                )}
                <Button type="submit">
                    {brand?.id ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}