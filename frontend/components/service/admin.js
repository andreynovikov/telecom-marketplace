import { ServiceAction } from '@/components/service/admin/actions'

import { getServices } from './queries'

export default async function ServiceList({ category }) {
    const data = await getServices(category)

    return (
        <table>
            <tbody>
                {data.map((service) => (
                    <tr key={service.id}>
                        <td>
                            <ServiceAction service={service} categoryId={category} />
                        </td>
                        <td>
                            {service.name}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
