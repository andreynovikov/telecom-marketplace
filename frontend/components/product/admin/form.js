'use client'

import { useState, useEffect, Suspense } from 'react'
import { useFormState } from 'react-dom'
import dynamic from 'next/dynamic'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import BrandSelect from '@/components/brand/admin/select'
import CategorySelect from '../category/admin/select'

const MDXEditor = dynamic(() => import('@/components/ui/admin/mdx-editor'), { ssr: false })

import { createProduct, updateProduct, deleteProduct } from '../queries'

export default function ProductEditDialog(props) {
    const { product, open, setOpen } = props
    const [description, setDescription] = useState('')

    const updateProductWithId = updateProduct.bind(null, product?.id)
    const deleteProductWithId = deleteProduct.bind(null, product?.id)

    const [state, dispatch] = useFormState(product?.id ? updateProductWithId : createProduct, product || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state, setOpen])

    useEffect(() => {
        if (product)
            setDescription(product.description)
    }, [product])

    return (
        <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
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
                    required
                    name="price"
                    type="text"
                    label="Цена"
                    margin="dense"
                    defaultValue={product?.price}
                    InputLabelProps={{ shrink: !!product?.price ? true : undefined }} />

                <Box margin={1}>
                    Категория *{' '}
                    <CategorySelect name="category" defaultValue={product?.category} />
                </Box>

                <Suspense fallback={
                    <TextField
                        fullWidth
                        name="description"
                        label="Описание"
                        multiline
                        rows={4}
                        margin="dense"
                        defaultValue={product?.description}
                        InputLabelProps={{ shrink: !!product?.description ? true : undefined }} />
                }>
                    <Card raised={false} sx={{ mt: 1, p: 1 }}>
                        <input type="hidden" name="description" value={description} />
                        <MDXEditor markdown={product?.description} onChange={setDescription} />
                    </Card>
                </Suspense>
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