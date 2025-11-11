'use client'

import { useEffect, useActionState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { createContractor } from '../queries'

export default function ContractorCreateDialog(props) {
    const { kind, open, setOpen } = props

    const [state, dispatch] = useActionState(createContractor, {})

    useEffect(() => {
        if (state.success)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                Добавить {kind === 2 ? 'заказчика' : 'поставщика'}
            </DialogTitle>
            <DialogContent>
                <input type="hidden" name="kind" value={kind} />

                <TextField
                    fullWidth
                    required
                    name="name"
                    type="text"
                    label="Название"
                    margin="dense" />

                <TextField
                    fullWidth
                    required
                    name="inn"
                    type="text"
                    label="ИНН"
                    margin="dense" />

                <TextField
                    fullWidth
                    name="legal_address"
                    type="text"
                    label="Юридический адрес"
                    margin="dense" />

                <TextField
                    fullWidth
                    name="contact_phone"
                    type="text"
                    label="Контактный телефон"
                    margin="dense" />

            </DialogContent>
            <DialogActions>
                <Button type="submit">
                    Добавить
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}
