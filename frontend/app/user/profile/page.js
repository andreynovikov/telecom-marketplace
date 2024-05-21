'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'


export default function Profile() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const session = await getSession()
            console.log(session)
            if (!!!session)
                router.refresh()
            else
                router.push(session.user?.role === 'admin' ? '/admin/contractors' : '/user/profile/contractor')
        })()
    }, [router])

    return null
}
