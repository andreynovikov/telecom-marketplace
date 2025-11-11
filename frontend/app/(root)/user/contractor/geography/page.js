'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import { getContractors, saveGeography } from '@/components/contractor/queries'

import SubjectSelector from '@/components/subject/select'

import { IconMapPins } from '@tabler/icons-react'

export default function ContractorForm() {
    const [data, setData] = useState({})

    const [state, dispatch] = useFormState(saveGeography, { success: true })

    useEffect(() => {
        if (state.success)
            getContractors().then((result) => setData(result.length > 0 ? result[0] : {}))
    }, [state])

    return (
        <>
            <DashboardHeader Icon={<IconMapPins />} href="/user/profile" title="География услуг" buttonText="Вернуться в профиль" />
            <Card sx={{ p: 3 }}>
                <form action={dispatch}>
                    <Grid container rowSpacing={1} columnSpacing={3}>
                        <SubjectSelector geography={data?.geography} />
                        <Grid sx={{ mt: 2 }} size={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Сохранить
                            </Button>
                            {!state.success && (
                                <Alert severity="error" sx={{ my: 1 }}>{JSON.stringify(state)}</Alert>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </>
    )
}
