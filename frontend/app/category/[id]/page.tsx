import { CategoryType, getCategories } from '@/components/category/queries'
import ServiceList from '@/components/service/list'

export default async function Services({ params }: { params: { id: number } }) {
    return (
        <div>
            <ServiceList category={params.id} />
        </div>
    )
}

export async function generateStaticParams() {
    const categories = await getCategories()

    return categories.map((category : CategoryType) => ({
        id: String(category.id)
    }))
}
