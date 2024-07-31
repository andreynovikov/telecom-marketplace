'use client'

import { useState } from 'react'

import { EditIcon, DeleteIcon, makeSvgIcon } from '@/theme/icons'
import { IconCopyPlus } from '@tabler/icons-react'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ServiceEditDialog from '@/components/service/admin/form'
import CategoryEditDialog from './form'
import { deleteCategory } from '../queries'

export const AddServiceIcon = (props) => makeSvgIcon(IconCopyPlus, props)

export default function CategoryActions({ category }) {
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [serviceOpen, setServiceOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setCategoryOpen(true)}>
                <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteCategory(category?.id)}>
                <DeleteIcon />
            </StyledIconButton>
            <StyledIconButton onClick={() => setServiceOpen(true)}>
                <AddServiceIcon />
            </StyledIconButton>
            <CategoryEditDialog category={category} open={categoryOpen} setOpen={setCategoryOpen} />
            <ServiceEditDialog categoryId={category.id} open={serviceOpen} setOpen={setServiceOpen} />
        </>
    )
}
