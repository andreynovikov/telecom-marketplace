'use client'

import { useState, useEffect, useActionState, Suspense } from 'react'
import dynamic from 'next/dynamic'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import CategorySelect from '../category/admin/select'

const MDXEditor = dynamic(() => import('@/components/ui/admin/mdx-editor'), { ssr: false })

import { createService, updateService, deleteService } from '../queries'

export default function ServiceEditDialog(props) {
    const { service, open, setOpen } = props
    const [description, setDescription] = useState('')

    const updateServiceWithId = updateService.bind(null, service?.id)
    const deleteServiceWithId = deleteService.bind(null, service?.id)

    const [state, dispatch] = useActionState(service?.id ? updateServiceWithId : createService, service || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state, setOpen])

    useEffect(() => {
        if (service)
            setDescription(service.description)
    }, [service])

    return (
        <Dialog open={open} maxWidth="lg" onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                {service?.id ? 'Редактировать услугу' : 'Добавить услугу'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    required
                    autoFocus
                    name="short_name"
                    type="text"
                    label="Краткое название"
                    margin="dense"
                    defaultValue={service?.short_name}
                    InputLabelProps={{ shrink: !!service?.short_name ? true : undefined }} />

                <TextField
                    fullWidth
                    required
                    name="name"
                    type="text"
                    label="Название"
                    margin="dense"
                    defaultValue={service?.name}
                    InputLabelProps={{ shrink: !!service?.name ? true : undefined }} />

                <Box sx={{ margin: 1 }}>
                    Категория *{' '}
                    <CategorySelect name="category" defaultValue={service?.category} />
                </Box>

                <Suspense fallback={
                    <TextField
                        fullWidth
                        name="description"
                        label="Описание"
                        multiline
                        rows={4}
                        margin="dense"
                        defaultValue={service?.description}
                        InputLabelProps={{ shrink: !!service?.description ? true : undefined }} />
                }>
                    <Card raised={false} sx={{ mt: 1, p: 1 }}>
                        <input type="hidden" name="description" value={description} />
                        <MDXEditor markdown={service?.description || ''} onChange={setDescription} />
                    </Card>
                </Suspense>
            </DialogContent>
            <DialogActions>
                {service?.id && (
                    <Button color="error" type="submit" formAction={deleteServiceWithId}>
                        Удалить
                    </Button>
                )}
                <Button type="submit">
                    {service?.id ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}