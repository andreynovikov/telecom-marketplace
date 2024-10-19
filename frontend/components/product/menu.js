import SideNavbarTwo from '@/components/theme/page-sidenav/side-navbar-2'

import { getCategories } from './category/queries'

export default async function ProductSidebarMenu() {
    const categories = await getCategories()

    const { tree, refs } = categories.reduce(({ tree, refs }, category) => {
        category.id = category.id.toString()
        if (category.parent)
            category.parent = category.parent.toString()
        category.path = `/category/${category.id}`
        if (category.id in refs)
            refs[category.id] = { ...category, ...refs[category.id] }
        else
            refs[category.id] = category
        if (category.parent === null) {
            tree.push(refs[category.id])
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

    return <SideNavbarTwo navigation={tree} />
}