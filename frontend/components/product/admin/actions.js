'use client'

import { useState } from 'react'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ProductEditDialog from './form'
import { deleteProduct } from '../queries'

export default function ProductActions({ product }) {
    const [productOpen, setProductOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setProductOpen(true)}>
                <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteProduct(product?.id)}>
                <DeleteIcon />
            </StyledIconButton>
            <ProductEditDialog product={product} open={productOpen} setOpen={setProductOpen} />
        </>
    )
}
