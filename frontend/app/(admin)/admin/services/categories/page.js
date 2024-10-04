import Card from '@mui/material/Card'

import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'
import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/service/category/admin/add-button'
import CategoryTree from '@/components/service/category/admin/tree'

import { getCategories } from '@/components/service/category/queries'

import { auth } from '@/lib/auth'

export default async function ServiceCategories() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const categories = await getCategories()

    return (
        <PageWrapper title="Категории услуг">
            <AddAction />
            <Card>
                <Scrollbar>
                    <CategoryTree categories={categories} />
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
