'use client'

import { useEffect, useActionState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { createPriceFactor, updatePriceFactor, deletePriceFactor } from '../queries'

export default function PriceFactorEditDialog(props) {
    const { factor, open, setOpen } = props
    const updatePriceFactorWithId = updatePriceFactor.bind(null, factor?.id)
    const deletePriceFactorWithId = deletePriceFactor.bind(null, factor?.id)

    const [state, dispatch] = useActionState(factor?.id ? updatePriceFactorWithId : createPriceFactor, factor || {})

    useEffect(() => {
        if (state.id)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                {factor?.id ? 'Редактировать коэффициент цен' : 'Добавить коэффициент цен'}
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
                    defaultValue={factor?.name}
                    InputLabelProps={{ shrink: !!factor?.name ? true : undefined }} />

                <TextField
                    fullWidth
                    required
                    name="factor"
                    type="text"
                    label="Коэффициент"
                    margin="dense"
                    defaultValue={factor?.factor}
                    helperText="Процент скидки или наценки в виде коэффициента: 0.85 (-15%), 0.5 (-50%), 1.15 (+15%)"
                    InputLabelProps={{ shrink: !!factor?.factor ? true : undefined }} />

            </DialogContent>
            <DialogActions>
                {factor?.id && (
                    <Button color="error" type="submit" formAction={deletePriceFactorWithId}>
                        Удалить
                    </Button>
                )}
                <Button type="submit">
                    {factor?.id ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}