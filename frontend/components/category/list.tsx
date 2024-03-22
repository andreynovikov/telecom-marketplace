import Link from 'next/link'

import { CategoryType, getCategories } from './queries'

export default async function CategoryList() {
    const data = await getCategories()

    return (
        <div>
            {data.map((category: CategoryType) => (
                <div key={category.id}>
                    <Link href={`/category/${category.id}`}>
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
