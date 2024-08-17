import Card from '@mui/material/Card'

import { H5, Paragraph } from '@/components/theme/Typography'
import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import ConsumerStatus from '@/components/contractor/consumer-status'
import ProviderStatus from '@/components/contractor/provider-status'
import UserInfo from '@/components/user/info'

import { IconUser } from '@tabler/icons-react'

import { auth } from '@/lib/auth'

export default async function Profile() {
    const session = await auth()

    return (
        <>
            <DashboardHeader Icon={<IconUser />} title="Мой профиль" buttonText="Редактировать профиль" href="/user/profile/edit" />
            <UserInfo user={session.user} />
            {session.user.provider && <ProviderStatus />}
            {session.user.consumer && (
                <>
                    <ConsumerStatus />
                    {!session.user.position && (
                        <Card sx={{ my: 3, px: 4, py: 2 }}>
                            <H5 mb={0.5} color="primary.main" fontWeight={600}>Требуется дополнительная информация</H5>
                            <Paragraph color="grey.600">
                                Необходимо указать должность в профиле пользователя
                            </Paragraph>
                        </Card>
                    )}
                </>
            )}
        </>
    )
}
