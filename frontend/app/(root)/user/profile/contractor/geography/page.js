'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Person from '@mui/icons-material/Person'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import { getContractors, saveGeography } from '@/components/contractor/queries'

import SubjectSelector from '@/components/subject/select'

export default function ContractorForm() {
    const [data, setData] = useState({})

    const [state, dispatch] = useFormState(saveGeography, { success: true })

    useEffect(() => {
        if (state.success)
            getContractors().then((result) => setData(result.length > 0 ? result[0] : {}))
    }, [state])

    return (
        <>
            <DashboardHeader Icon={Person} href="/profile" title="Анкета поставщика" buttonText="Вернуться в профиль" />
            <Card sx={{ p: 3 }}>
                <form action={dispatch}>
                    <Grid container rowSpacing={1} columnSpacing={3}>
                        <SubjectSelector geography={data?.geography} />
                        <Grid item xs={12} sx={{ mt: 2 }}>
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
