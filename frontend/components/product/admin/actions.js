'use client'

import { useState } from 'react'

import { EditIcon, AttachIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ProductEditDialog from './form'
import ProductImagesDialog from './images'

import { deleteProduct } from '../queries'

export default function ProductActions({ product }) {
    const [productOpen, setProductOpen] = useState(false)
    const [imagesOpen, setImagesOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setProductOpen(true)}>
                <EditIcon />
            </StyledIconButton>
            <StyledIconButton onClick={() => setImagesOpen(true)}>
                <AttachIcon />
            </StyledIconButton>
            <StyledIconButton onClick={async () => await deleteProduct(product?.id)}>
                <DeleteIcon />
            </StyledIconButton>
            <ProductEditDialog product={product} open={productOpen} setOpen={setProductOpen} />
            <ProductImagesDialog product={product} open={imagesOpen} setOpen={setImagesOpen} />
        </>
    )
}
