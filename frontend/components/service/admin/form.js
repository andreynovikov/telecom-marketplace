'use client'

import { useState, useEffect, Suspense } from 'react'
import { useFormState } from 'react-dom'
import dynamic from 'next/dynamic'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

const MDXEditor = dynamic(() => import('@/components/ui/admin/mdx-editor'), { ssr: false })

import { createService, updateService, deleteService } from '../queries'

export default function ServiceEditDialog(props) {
    const { service, categoryId, open, setOpen } = props
    const [description, setDescription] = useState('')

    const createServiceWithCategory = createService.bind(null, categoryId)
    const updateServiceWithCategory = updateService.bind(null, service?.id, categoryId)
    const deleteServiceWithCategory = deleteService.bind(null, service?.id, categoryId)

    const [state, dispatch] = useFormState(service?.id ? updateServiceWithCategory : createServiceWithCategory, service || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state])

    useEffect(() => {
        if (service)
            setDescription(service.description)
    }, [service])

    const hanldeDescriptionChange = (value) => {
        setDescription(value)
    }

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
                        <MDXEditor markdown={service?.description} onChange={hanldeDescriptionChange} />
                    </Card>
                </Suspense>
            </DialogContent>
            <DialogActions>
                {service?.id && (
                    <Button color="error" type="submit" formAction={deleteServiceWithCategory}>
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