'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import BrandSelect from '@/components/brand/admin/select'
import CategorySelect from '../category/admin/select'
import ImageUpload from './image-upload'

import { createProduct, updateProduct, deleteProduct } from '../queries'

export default function ProductEditDialog(props) {
    const { product, open, setOpen } = props
    const updateProductWithId = updateProduct.bind(null, product?.id)
    const deleteProductWithId = deleteProduct.bind(null, product?.id)

    const [state, dispatch] = useFormState(product?.id ? updateProductWithId : createProduct, product || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                {product?.id ? 'Редактировать товар' : 'Добавить товар'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    required
                    autoFocus
                    name="code"
                    type="text"
                    label="Код"
                    margin="dense"
                    defaultValue={product?.code}
                    InputLabelProps={{ shrink: !!product?.code ? true : undefined }} />

                <BrandSelect
                    name="brand"
                    defaultValue={product?.brand}
                    required />

                <TextField
                    fullWidth
                    required
                    name="name"
                    type="text"
                    label="Название"
                    margin="dense"
                    defaultValue={product?.name}
                    InputLabelProps={{ shrink: !!product?.name ? true : undefined }} />

                <TextField
                    fullWidth
                    name="description"
                    label="Описание"
                    multiline
                    rows={4}
                    margin="dense"
                    defaultValue={product?.description}
                    InputLabelProps={{ shrink: !!product?.description ? true : undefined }} />

                <Box margin={1}>
                    Категория *{' '}
                    <CategorySelect name="category" defaultValue={product?.category} />
                </Box>

                <Box margin={1}>
                    Изображение:{' '}
                    {product?.image && <b>{product.image}{' '}</b>}
                    <ImageUpload name="image" />
                </Box>
            </DialogContent>
            <DialogActions>
                {product?.id && (
                    <Button color="error" type="submit" formAction={deleteProductWithId}>
                        Удалить
                    </Button>
                )}
                <Button type="submit">
                    {product?.id ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}