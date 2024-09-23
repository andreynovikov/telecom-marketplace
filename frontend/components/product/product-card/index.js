import { Fragment } from 'react'
import Link from 'next/link'

import LazyImage from "@/components/theme/LazyImage";
import { FlexBox } from "@/components/theme/flex-box";
import { H6, Paragraph } from "@/components/theme/Typography";

import ProductCardShopping from './shopping'

import { currency } from '@/lib'

import { Content, PriceText } from "./styles";

export default function ProductCard({
    product
}) {
    const {
        id,
        name,
        image
    } = product || {};

    return <Fragment>
        <Link href={`/product/${id}`}>
            <FlexBox bgcolor="grey.50" borderRadius={3} mb={2}>
                {image && (
                    <LazyImage
                        alt={name}
                        width={image.thumbnail.width}
                        height={image.thumbnail.height}
                        src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${image.thumbnail.src}`}
                        sx={{p: 5}} />
                )}
            </FlexBox>
        </Link>

        <Content>
            <H6 fontSize={17} fontWeight={700}>
                {name}
            </H6>

            <PriceText>
                { currency(product.price) }
            </PriceText>

            <ProductCardShopping product={product} />
        </Content>
    </Fragment>
}