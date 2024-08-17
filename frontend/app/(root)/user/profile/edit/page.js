import Card from '@mui/material/Card'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import ProfileForm from '@/components/user/profile-form'

import { IconUser } from '@tabler/icons-react'

export default function ProfileEdit() {
    return (
        <>
            <DashboardHeader Icon={<IconUser />} href="/user/profile" title="Редактирование профиля" buttonText="Вернуться в профиль" />
            <Card sx={{ p: 3 }}>
                <ProfileForm />
            </Card>
        </>
    )
}
