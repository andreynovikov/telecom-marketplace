'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { createUser, updateUser, deleteUser } from '../queries'

export default function UserEditDialog(props) {
    const { user, open, setOpen } = props
    const updateUserWithId = updateUser.bind(null, user?.id)
    const deleteUserWithId = deleteUser.bind(null, user?.id)

    const [state, dispatch] = useFormState(user?.id ? updateUserWithId : createUser, user ? { data: user } : {})

    useEffect(() => {
        if (state.data?.id)
            setOpen(false)
    }, [state])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ component: 'form', action: dispatch }}>
            <DialogTitle variant="h6" component="h2">
                {user?.id ? 'Редактировать пользователя' : 'Добавить пользователя'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    required
                    autoFocus
                    name="name"
                    type="text"
                    label="ФИО"
                    margin="dense"
                    defaultValue={user?.name}
                    InputLabelProps={{ shrink: !!user?.name ? true : undefined }} />

                <TextField
                    fullWidth
                    required
                    name="email"
                    type="text"
                    label="Электронная почта"
                    margin="dense"
                    defaultValue={user?.email}
                    InputLabelProps={{ shrink: !!user?.email ? true : undefined }} />

                {user?.id > 1 && (
                    <>
                        <TextField
                            fullWidth
                            name="phone"
                            type="text"
                            label="Телефон"
                            margin="dense"
                            defaultValue={user?.phone}
                            InputLabelProps={{ shrink: !!user?.phone ? true : undefined }} />

                        <TextField
                            fullWidth
                            name="position"
                            type="text"
                            label="Должность"
                            margin="dense"
                            defaultValue={user?.position}
                            InputLabelProps={{ shrink: !!user?.position ? true : undefined }} />

                        <FormGroup>
                            <FormControlLabel control={<Checkbox name="provider" value="1" defaultChecked={user?.provider} />} label="Представитель поставщика" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name="consumer" value="1" defaultChecked={user?.consumer} />} label="Представитель заказчика" />
                        </FormGroup>
                    </>
                )}

                <Divider sx={{ my: 1 }} />

                <TextField
                    fullWidth
                    name="password"
                    type="text"
                    label="Пароль"
                    margin="dense"
                    helperText="Оставьте пустым, чтобы оставить без изменения" />

                <FormGroup>
                    <FormControlLabel control={<Checkbox name="admin" value="1" defaultChecked={user?.admin} disabled={user?.id === 1} />} label="Администратор" />
                    {user?.id === 1 && <input type="hidden" name="admin" value="1" />}
                </FormGroup>

            </DialogContent>
            <DialogActions>
                {user?.id && user?.id !== 1 && (
                    <Button color="error" type="submit" formAction={deleteUserWithId}>
                        Удалить
                    </Button>
                )}
                <Button type="submit">
                    {user?.id ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}