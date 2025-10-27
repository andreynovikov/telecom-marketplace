import Link from 'next/link'
import Box from '@mui/material/Box'

import LazyImage from '@/components/theme/LazyImage'
import { FlexRowCenter } from '@/components/theme/flex-box'
import { H3, Paragraph } from '@/components/theme/Typography'

import HoverActions from './components/hover-actions'
import Price from './components/price'
import QuantityButtons from './components/quantity-buttons'

import { IconCamera } from '@tabler/icons-react'

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"

import { getProductImages } from '@/components/product/queries'

export default async function ProductCard({
    hoverEffect,
    product
}) {
    const images = product.id !== undefined ? await getProductImages(product.id) : []

    return <StyledBazaarCard hoverEffect={hoverEffect}>
        <ImageWrapper>

            <HoverActions product={product} images={images} />

            <Link href={`/product/${product.id}`}>
                <FlexRowCenter bgcolor="grey.50" borderRadius={3} mb={2} sx={{ aspectRatio: 1, position: "relative" }}>
                    {images.length > 0 ? (
                        <LazyImage
                            alt={product.name}
                            fill
                            src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${images[0].src}`}
                            sx={{ p: 2, objectFit: "contain" }} />
                    ) : (
                        <IconCamera color='grey' size={150} strokeWidth={1.5} />
                    )}
                </FlexRowCenter>
            </Link>
        </ImageWrapper>

        <ContentWrapper>
            <Box flex="1 1 0" minWidth="0px" mr={1}>
                <Link href={`/product/${product.id}`}>
                    <H3 mb={1} ellipsis title={product.name} fontSize={14} fontWeight={600} className="title" color="text.secondary">
                        {product.name}
                    </H3>
                </Link>

                <Paragraph fontWeight={600} color="primary.main" mt={0.5}>
                    <Price product={product} />
                </Paragraph>

            </Box>

            <QuantityButtons product={product} />
        </ContentWrapper>
    </StyledBazaarCard>
}