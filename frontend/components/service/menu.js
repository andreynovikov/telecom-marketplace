import SideNavbarTwo from '@/components/theme/page-sidenav/side-navbar-2'

import { getCategories } from './category/queries'
import { getServices } from './queries'

export default async function ServiceSidebarMenu() {
    const categories = await getCategories()
    const navigation = await Promise.all(categories.map(async (category) => {
        const services = await getServices(category.id)
        return {
            name: category.name,
            path: `/category/${category.id}`,
            children: services.map(service => {
                return {
                    name: service.short_name,
                    path: `/service/${service.id}`
                }
            })
        }
    }))

    return <SideNavbarTwo navigation={navigation} />
}