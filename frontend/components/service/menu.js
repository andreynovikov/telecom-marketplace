import SideNavbarTwo from '@/components/theme/page-sidenav/side-navbar-2'

import { getCategories } from './category/queries'
import { getServices } from './queries'

export default async function ServiceSidebarMenu() {
    const categories = await getCategories()

    const { tree, refs } = categories.reduce(({ tree, refs }, category) => {
        if (category.id in refs)
            refs[category.id] = { ...category, ...refs[category.id] }
        else
            refs[category.id] = category
        if (category.parent === null) {
            tree.push(category)
        } else {
            if (!(category.parent in refs))
                refs[category.parent] = {
                    id: category.parent,
                    children: []
                }
            else if (!('children' in refs[category.parent]))
                refs[category.parent].children = []
            const child = refs[category.parent].children.find((child) => child.id === category.id)
            if (child === undefined)
                refs[category.parent].children.push(category)
        }
        return { tree, refs }
    }, { tree: [], refs: {} })

    await Promise.all(categories.map(async (category) => {
        const services = await getServices([{field: 'category', value: category.id}])
        if (services.length > 0) {
            if (!('children' in refs[category.id]))
                refs[category.id].children = []
            services.map(service => {
                refs[category.id].children.push({
                    name: service.short_name,
                    path: `/service/${service.id}`
                })
            })
        }
        /*
        } else if (!('children' in refs[category.id]) || refs[category.id].children.length === 0) {
            if (refs[category.id].parent === null) {
                const idx = tree.indexOf(refs[category.id])
                tree.splice(idx, idx !== -1 ? 1 : 0)
            }
        }
        */
    }))

    return <SideNavbarTwo navigation={tree} />
}