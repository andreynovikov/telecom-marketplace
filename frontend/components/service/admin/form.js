'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { createService, updateService, deleteService } from '../queries'

export default function ServiceEditDialog(props) {
    const { service, categoryId, open, setOpen } = props
    const createServiceWithCategory = createService.bind(null, categoryId)
    const updateServiceWithCategory = updateService.bind(null, service?.id, categoryId)
    const deleteServiceWithCategory = deleteService.bind(null, service?.id, categoryId)

    const [state, dispatch] = useFormState(service?.id ? updateServiceWithCategory : createServiceWithCategory, service || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                {service?.id ? 'Редактировать услугу' : 'Добавить услугу'}
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
                    defaultValue={service?.name}
                    InputLabelProps={{ shrink: !!service?.name ? true : undefined }} />

                <TextField
                    fullWidth
                    name="description"
                    label="Описание"
                    multiline
                    rows={4}
                    margin="dense"
                    defaultValue={service?.description}
                    InputLabelProps={{ shrink: !!service?.description ? true : undefined }} />
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