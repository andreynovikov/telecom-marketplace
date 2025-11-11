'use client'

import { useState } from 'react'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import PriceFactorEditDialog from './form'
import { deletePriceFactor } from '../queries'

export default function PriceFactorActions({ factor }) {
    const [priceFactorOpen, setPriceFactorOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setPriceFactorOpen(true)}>
                <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deletePriceFactor(factor?.id)}>
                <DeleteIcon />
            </StyledIconButton>
            <PriceFactorEditDialog factor={factor} open={priceFactorOpen} setOpen={setPriceFactorOpen} />
        </>
    )
}
