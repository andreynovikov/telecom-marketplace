'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import ContractorStatus from '@/components/contractor/status'
import UserInfo from '@/components/user/info'

import { IconUser } from '@tabler/icons-react'
import { makeSvgIcon } from '@/theme/icons'

const UserIcon = (props) => makeSvgIcon(IconUser, props)

export default function Profile() {
    const [user, setUser] = useState({})
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
                setUser(session.user)
        })()
    }, [router])

    return (
        <>
            <DashboardHeader Icon={UserIcon} title="Мой профиль" buttonText="Редактировать профиль" href="/user/profile/edit" />
            {user && <UserInfo user={user} />}
            <ContractorStatus />
        </>
    )
}
