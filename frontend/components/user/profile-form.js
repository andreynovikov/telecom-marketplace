'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSession } from 'next-auth/react'

import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { getUser, updateUser } from '@/components/user/queries'

export default function ProfileForm() {
    const [userId, setUserId] = useState()
    const [data, setData] = useState({})

    const updateUserWithId = updateUser.bind(null, userId)

    const [state, dispatch] = useFormState(updateUserWithId, { success: true })
    const { data: session, update: updateSession } = useSession()

    useEffect(() => {
        if (session?.user)
            setUserId(session.user.id)
    }, [session])

    useEffect(() => {
        if (state.success && userId)
            getUser(userId).then((result) => {
                setData(result)
                updateSession({ ...session, user: { ...session?.user, ...result } })
            })
    }, [state, userId])

    return (
        <form action={dispatch}>
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        required
                        name="name"
                        type="text"
                        label="ФИО"
                        defaultValue={data.name}
                        InputLabelProps={{ shrink: !!data.name ? true : undefined }} />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        required
                        name="email"
                        type="email"
                        label="Электронная почта"
                        defaultValue={data.email}
                        InputLabelProps={{ shrink: !!data.email ? true : undefined }} />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        name="phone"
                        type="text"
                        label="Контактный телефон"
                        defaultValue={data.phone}
                        InputLabelProps={{ shrink: !!data.phone ? true : undefined }} />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        name="position"
                        type="text"
                        label="Должность в компании"
                        defaultValue={data.position}
                        InputLabelProps={{ shrink: !!data.position ? true : undefined }} />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Сохранить
                    </Button>
                    {!state.success && (
                        <Alert severity="error" sx={{ my: 1 }}>{JSON.stringify(state)}</Alert>
                    )}
                </Grid>
            </Grid>
        </form>
    )
}
