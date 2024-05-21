import { auth } from '@/lib/auth'

import ServiceList from '@/components/service/admin'
import { ServiceAction } from '@/components/service/admin/actions'
import { getCategories } from '@/components/category/queries'

export default async function CategoryList() {
    const categories = await getCategories()
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="statement_table table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Категория</th>
                                <th>Услуги</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <ServiceList category={category.id} />
                                    </td>
                                    <td className="action">
                                        <ServiceAction categoryId={category.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
