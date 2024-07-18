'use client'

import { useState } from 'react'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ProductEditDialog from './form'
import { deleteProduct } from '../queries'

export default function ProductActions({ product }) {
    const [productOpen, setProductOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setProductOpen(true)}>
                <Edit />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteProduct(product?.id)}>
                <Delete />
            </StyledIconButton>
            <ProductEditDialog product={product} open={productOpen} setOpen={setProductOpen} />
        </>
    )
}
