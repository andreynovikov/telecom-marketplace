import { redirect } from 'next/navigation'

import Card from '@mui/material/Card'

import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'
import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/product/category/admin/add-button'
import CategoryTree from '@/components/product/category/admin/tree'

import { getCategories } from '@/components/product/category/queries'

import { auth } from '@/lib/auth'

export default async function ProductCategories() {
    const session = await auth()
    if (session?.user?.role !== "admin") redirect('/login')

    const categories = await getCategories()

    return (
        <PageWrapper title="Категории товаров">
            <AddAction />
            <Card>
                <Scrollbar>
                    <CategoryTree categories={categories} />
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
