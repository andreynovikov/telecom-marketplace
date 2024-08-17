'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { Paragraph } from '@/components/theme/Typography'

import Card from '@mui/material/Card'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import { getContractors, saveContractor } from '@/components/contractor/queries'

import { IconClipboardText } from '@tabler/icons-react'

export default function ContractorForm() {
    const [data, setData] = useState({})
    const [endConsumer, setEndConsumer] = useState(false)

    const [state, dispatch] = useFormState(saveContractor, { success: true })

    useEffect(() => {
        if (state.success)
            getContractors().then((result) => {
                setData(result.length > 0 ? result[0] : {})
                setEndConsumer(result.length > 0 ? result[0].end_consumer : false)
            })
    }, [state])

    return (
        <>
            <DashboardHeader Icon={<IconClipboardText />} href="/user/profile" title="Информация о заказчике" buttonText="Вернуться в профиль" />
            <Card sx={{ p: 3 }}>
                <form action={dispatch}>
                    <input type="hidden" name="kind" value="2" />
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                required
                                name="name"
                                type="text"
                                label="Название компании"
                                defaultValue={data.name}
                                InputLabelProps={{ shrink: !!data.name ? true : undefined }} />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                required
                                name="inn"
                                type="text"
                                label="ИНН"
                                defaultValue={data.inn}
                                error={!!state.errors?.inn}
                                helperText={state.errors?.inn}
                                InputLabelProps={{ shrink: !!data.inn ? true : undefined }} />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                name="legal_address"
                                type="text"
                                label="Юридический адрес"
                                defaultValue={data.legal_address}
                                InputLabelProps={{ shrink: !!data.legal_address ? true : undefined }} />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                name="contact_phone"
                                type="text"
                                label="Контактный телефон"
                                defaultValue={data.contact_phone}
                                InputLabelProps={{ shrink: !!data.contact_phone ? true : undefined }} />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="end_consumer"
                                        value={true}
                                        checked={endConsumer}
                                        onChange={(event) => setEndConsumer(event.target.checked)}
                                    />}
                                label="Компания является конечным потребителем товаров и услуг, предложенных на маркетплейсе" />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Сохранить
                            </Button>
                            {!state.success && (
                                <Alert severity="error" sx={{ my: 1 }}>{JSON.stringify(state)}</Alert>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Paragraph color="grey.600" fontSize={12}>
                                Вы можете заполнить некоторые поля позже
                            </Paragraph>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </>
    )
}
