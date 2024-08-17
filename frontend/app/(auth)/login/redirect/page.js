'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

export default function Profile() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const session = await getSession()
            console.log(session)
            if (!!!session)
                router.refresh()
            else if (session.user?.role === 'admin')
                router.push('/admin/contractors')
            else
                router.push('/user/profile')
        })()
    }, [router])

    return (
        <Stack alignItems="center" justifyContent="center" sx={{minHeight: 200}}>
            <CircularProgress size={80} />
        </Stack>
    )
}
