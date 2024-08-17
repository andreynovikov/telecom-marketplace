import Card from '@mui/material/Card'

import DashboardHeader from '@/components/theme/pages-sections/customer-dashboard/dashboard-header'

import CatalogueForm from '@/components/contractor/catalogue-form'

import { IconListLetters } from '@tabler/icons-react'

export default async function ContractorForm() {
    return (
        <>
            <DashboardHeader Icon={<IconListLetters />} href="/user/profile" title="Каталог услуг" buttonText="Вернуться в профиль" />
            <Card sx={{ p: 3 }}>
                <CatalogueForm />
            </Card>
        </>
    )
}
