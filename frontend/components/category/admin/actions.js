'use client'

import { useState } from 'react'
import Link from 'next/link'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueueIcon from '@mui/icons-material/Queue'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ServiceEditDialog from '@/components/service/admin/form'
import CategoryEditDialog from './form'
import { deleteCategory } from '../queries'

export default function CategoryActions({ category }) {
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [serviceOpen, setServiceOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setCategoryOpen(true)}>
                <Edit />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteCategory(category?.id)}>
                <Delete />
            </StyledIconButton>
            <StyledIconButton onClick={() => setOpen(true)}>
                <QueueIcon />
            </StyledIconButton>
            <CategoryEditDialog category={category} open={categoryOpen} setOpen={setCategoryOpen} />
            <ServiceEditDialog categoryId={category.id} open={serviceOpen} setOpen={setServiceOpen} />
        </>
    )
}
