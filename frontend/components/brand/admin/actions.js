'use client'

import { useState } from 'react'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import QueueIcon from '@mui/icons-material/Queue'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import BrandEditDialog from './form'
import { deleteBrand } from '../queries'

export default function BrandActions({ brand }) {
    const [brandOpen, setBrandOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setBrandOpen(true)}>
                <Edit />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteBrand(brand?.id)}>
                <Delete />
            </StyledIconButton>
            <BrandEditDialog brand={brand} open={brandOpen} setOpen={setBrandOpen} />
        </>
    )
}
