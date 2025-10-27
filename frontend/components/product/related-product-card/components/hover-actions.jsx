'use client'

import IconButton from '@mui/material/IconButton'

import { ViewIcon } from '@/theme/icons'

import ProductViewDialog from '@/components/product/view-dialog'
import { HoverIconWrapper } from '../styles'

import useProduct from '@/components/product/use-product'

export default function HoverActions({product, images}) {
    const {
        isFavorite,
        toggleFavorite,
        openModal,
        toggleDialog,
    } = useProduct(product.id)

    return <HoverIconWrapper className="hover-box">
        <IconButton onClick={toggleDialog}>
            <ViewIcon color="disabled" fontSize="small" />
        </IconButton>

        {/*
        <IconButton onClick={toggleFavorite}>
            {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" color="disabled" />}
        </IconButton>
        */
        }
        <ProductViewDialog product={product} images={images} open={openModal} onClose={toggleDialog} />
    </HoverIconWrapper>
}