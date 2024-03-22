import { ServiceType, getServices } from './queries'

export default async function ServiceList({ category }: { category: number }) {
    const data = await getServices(category)

    return (
        <div>
            {data.map((service: ServiceType) => (
                <div key={service.id}>
                    {service.name}
                </div>
            ))}
        </div>
    )
}
