'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import { getContractors, saveCatalogue } from '@/components/contractor/queries'

import ServiceSelector from '@/components/service/select'

import { IconListLetters } from '@tabler/icons-react'
import { makeSvgIcon } from '@/theme/icons'

const CatalogueIcon = (props) => makeSvgIcon(IconListLetters, props)

export default function CatalogueForm() {
    const [data, setData] = useState({})

    const [state, dispatch] = useFormState(saveCatalogue, { success: true })

    useEffect(() => {
        if (state.success)
            getContractors().then((result) => setData(result.length > 0 ? result[0] : {}))
    }, [state])

    return (
        <form action={dispatch}>
            <ServiceSelector catalogue={data?.services} />
            <Button type="submit" variant="contained" color="primary">
                Сохранить
            </Button>
            {!state.success && (
                <Alert severity="error" sx={{ my: 1 }}>{JSON.stringify(state)}</Alert>
            )}
        </form>
    )
}
