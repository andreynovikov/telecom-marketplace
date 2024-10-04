import { useState, useEffect } from 'react'

import { RichTreeView } from '@mui/x-tree-view/RichTreeView'

import { IconChevronRight, IconChevronDown, IconPoint } from '@tabler/icons-react'

import { getCategories } from '../queries'

export default function CategorySelect(props) {
    const { defaultValue, name } = props
    const [selectedItem, setSelectedItem] = useState()
    const [expandedItems, setExpandedItems] = useState([])

    const handleItemSelectionToggle = (event, itemId, isSelected) => {
        if (isSelected)
            setSelectedItem(itemId)
    }

    const [categories, setCategories] = useState([])
    const [categoryTree, setCategoryTree] = useState([])
    const [categoryRefs, setCategoryRefs] = useState({})

    useEffect(() => {
        getCategories().then((result) => setCategories(result))
    }, [])

    useEffect(() => {
        const { tree, refs } = categories.reduce(({ tree, refs }, c) => {
            const category = { ...c, id: c.id.toString(), parent: c.parent ? c.parent.toString() : null }
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
        setCategoryTree(tree)
        setCategoryRefs(refs)
    }, [categories])

    useEffect(() => {
        const expand = []
        let parent = categoryRefs[defaultValue.toString()]
        while (parent !== undefined) {
            expand.push(parent.id)
            parent = categoryRefs[parent.parent]
        }
        setExpandedItems((expandedItems) => [...expandedItems, ...expand])
    }, [defaultValue, categoryRefs])

    const handleExpandedItemsChange = (event, itemIds) => {
        setExpandedItems(itemIds)
    }

    return (
        <>
            <input type="hidden" name={name} value={selectedItem ? selectedItem : defaultValue} />
            <RichTreeView
                items={categoryTree}
                getItemLabel={(item) => item.name}
                onItemSelectionToggle={handleItemSelectionToggle}
                defaultSelectedItems={defaultValue ? [defaultValue.toString()] : []}
                expandedItems={expandedItems}
                onExpandedItemsChange={handleExpandedItemsChange}
                expansionTrigger="iconContainer"
                slots={{
                    expandIcon: IconChevronRight,
                    collapseIcon: IconChevronDown,
                    endIcon: IconPoint
                }} />
        </>
    )
}
