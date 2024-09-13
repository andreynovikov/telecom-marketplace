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

    useEffect(() => {
        getCategories().then((result) => setCategories(result))
    }, [])

    useEffect(() => {
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
                refs[category.parent].children.push(category)
            }
            return { tree, refs }
        }, { tree: [], refs: {} })
        setCategoryTree(tree)
        const expand = []
        let parent = refs[defaultValue]
        while (parent !== undefined) {
            expand.push(parent.id)
            parent = refs[parent.parent]
        }
        setExpandedItems((expandedItems) => [...expandedItems, ...expand])
    }, [defaultValue, categories])

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
                defaultSelectedItems={defaultValue ? [defaultValue] : []}
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
