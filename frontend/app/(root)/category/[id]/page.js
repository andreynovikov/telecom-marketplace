import { getCategories } from '@/components/service/category/queries'
import ServiceList from '@/components/service/list'

export default async function Services({ params }) {
    return (
        <div>
            <ServiceList category={params.id} />
        </div>
    )
}

export async function generateStaticParams() {
    const categories = await getCategories()

    return categories.map((category) => ({
        id: String(category.id)
    }))
}
