'use client'

import { useState, useEffect, useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Paragraph } from '@/components/theme/Typography'

import Card from '@mui/material/Card'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import { getContractors, saveContractor } from '@/components/contractor/queries'

import FileUpload from '@/components/ui/file-upload'

import { IconClipboardText } from '@tabler/icons-react'

export default function ContractorForm() {
    const [data, setData] = useState({})

    const [state, dispatch] = useActionState(saveContractor, {success: true})

    useEffect(() => {
        if (state.success)
            getContractors().then((result) => setData(result.length > 0 ? result[0] : {}))
    }, [state])

    return (
        <>
            <DashboardHeader Icon={<IconClipboardText />} href="/user/profile" title="Анкета поставщика" buttonText="Вернуться в профиль" />
            <Card sx={{ p: 3 }}>
                <form action={dispatch}>
                    <input type="hidden" name="kind" value="1" />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                name="name"
                                type="text"
                                label="Название компании"
                                defaultValue={data.name}
                                InputLabelProps={{ shrink: !!data.name ? true : undefined }} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
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

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                name="legal_address"
                                type="text"
                                label="Юридический адрес"
                                defaultValue={data.legal_address}
                                InputLabelProps={{ shrink: !!data.legal_address ? true : undefined }} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                name="contact_phone"
                                type="text"
                                label="Контактный телефон"
                                defaultValue={data.contact_phone}
                                InputLabelProps={{ shrink: !!data.contact_phone ? true : undefined }} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                name="cover_letter"
                                label="Краткая информация о компании"
                                multiline
                                rows={4}
                                defaultValue={data.cover_letter}
                                InputLabelProps={{ shrink: !!data.cover_letter ? true : undefined }} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                name="experience"
                                label="Краткое описание опыта работы"
                                multiline
                                rows={4}
                                defaultValue={data.experience}
                                InputLabelProps={{ shrink: !!data.experience ? true : undefined }} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FileUpload
                                name="company_info"
                                current={data.company_info}
                                description="файл с информацией о компании"
                                variants="Документ или архив" />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FileUpload
                                name="pricelist"
                                current={data.pricelist}
                                description="файл с прайслистом на услуги"
                                variants="Документ или архив" />
                        </Grid>

                        <Grid size={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Сохранить
                            </Button>
                            { !state.success && (
                                <Alert severity="error" sx={{my: 1}}>{JSON.stringify(state)}</Alert>                                
                            )}
                        </Grid>

                        <Grid size={12}>
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
