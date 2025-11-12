import { getServices } from './queries'

export default async function ServiceList({ category }) {
    const data = await getServices([{field: 'category_id', value: category}])

    return (
        <div>
            {data.map((service) => (
                <div key={service.id}>
                    {service.name}
                </div>
            ))}
        </div>
    )
}
