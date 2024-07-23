'use client'

import { useState } from 'react'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import BrandEditDialog from './form'
import { deleteBrand } from '../queries'

export default function BrandActions({ brand }) {
    const [brandOpen, setBrandOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setBrandOpen(true)}>
                <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteBrand(brand?.id)}>
                <DeleteIcon />
            </StyledIconButton>
            <BrandEditDialog brand={brand} open={brandOpen} setOpen={setBrandOpen} />
        </>
    )
}
