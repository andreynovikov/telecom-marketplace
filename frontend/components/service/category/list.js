import Link from 'next/link'
import Container from '@mui/material/Container'

import ServiceList from '@/components/service/list'

import { getCategories } from './queries'

export default async function CategoryList() {
    const data = await getCategories()

    return (
        <Container className="mt-2">
            {data.map((category) => (
                <div key={category.id}>
                    <Link href={`/category/${category.id}`}>
                        {category.name}
                    </Link>
                    <ServiceList category={category.id} />
                </div>
            ))}
        </Container>
    )
}
