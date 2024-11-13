'use client'

import Link from 'next/link'
import Box from '@mui/material/Box'

import LazyImage from '@/components/theme/LazyImage'
import { FlexRowCenter } from '@/components/theme/flex-box'
import { H3, Paragraph } from '@/components/theme/Typography'

import ProductViewDialog from '../view-dialog'
import HoverActions from './components/hover-actions'
import QuantityButtons from './components/quantity-buttons'

import useProduct from '../use-product'

import { currency } from '@/lib'

import { IconCamera } from '@tabler/icons-react'

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"

export default function ProductCard({
    hoverEffect,
    product
}) {
    const {
        id,
        name,
        price,
        images
    } = product || {}

    const {
        available,
        priceFactor,
        cartItem,
        isFavorite,
        toggleFavorite,
        openModal,
        toggleDialog,
        handleCartAmountChange
    } = useProduct(id)

    const handleIncrementQuantity = () => {
        handleCartAmountChange((cartItem?.quantity || 0) + 1, 'add')
    }

    const handleDecrementQuantity = () => {
        handleCartAmountChange((cartItem?.quantity || 0) - 1, 'remove')
    }

    return <StyledBazaarCard hoverEffect={hoverEffect}>
        <ImageWrapper>

            <HoverActions isFavorite={isFavorite} toggleView={toggleDialog} toggleFavorite={toggleFavorite} />

            <Link href={`/product/${id}`}>
                <FlexRowCenter bgcolor="grey.50" borderRadius={3} mb={2} sx={{ aspectRatio: 1, position: "relative" }}>
                    {images.length > 0 ? (
                        <LazyImage
                            alt={name}
                            fill
                            src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${images[0].src}`}
                            sx={{ p: 2, objectFit: "contain" }} />
                    ) : (
                        <IconCamera color='grey' size={150} strokeWidth={1.5} />
                    )}
                </FlexRowCenter>
            </Link>
        </ImageWrapper>

        <ProductViewDialog open={openModal} onClose={toggleDialog} product={product} />

        <ContentWrapper>
            <Box flex="1 1 0" minWidth="0px" mr={1}>
                <Link href={`/product/${id}`}>
                    <H3 mb={1} ellipsis title={name} fontSize={14} fontWeight={600} className="title" color="text.secondary">
                        {name}
                    </H3>
                </Link>

                <Paragraph fontWeight={600} color="primary.main" mt={0.5}>
                    {currency(price * priceFactor)}
                </Paragraph>

            </Box>

            { available && <QuantityButtons quantity={cartItem?.quantity || 0} handleIncrement={handleIncrementQuantity} handleDecrement={handleDecrementQuantity} /> }
        </ContentWrapper>
    </StyledBazaarCard>
}