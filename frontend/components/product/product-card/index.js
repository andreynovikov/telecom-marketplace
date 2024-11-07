import { Fragment } from 'react'
import Link from 'next/link'

import LazyImage from "@/components/theme/LazyImage";
import { FlexRowCenter } from "@/components/theme/flex-box";
import { H6 } from "@/components/theme/Typography";

import ProductCardShopping from './shopping'

import { IconCamera } from '@tabler/icons-react'

import { currency } from '@/lib'

import { Content, PriceText } from "./styles";

export default function ProductCard({
    product
}) {
    const {
        id,
        name,
        price,
        images
    } = product || {};

    return <Fragment>
        <Link href={`/product/${id}`}>
            <FlexRowCenter bgcolor="grey.50" borderRadius={3} mb={2} sx={{ aspectRatio: 1, position: "relative" }}>
                {images.length > 0 ? (
                    <LazyImage
                        alt={name}
                        fill
                        src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${images[0].src}`}
                        sx={{p: 2, objectFit: "contain" }} />
                ) : (
                    <IconCamera color='grey' size={150} strokeWidth={1.5} />
                )}
            </FlexRowCenter>
        </Link>

        <Content>
            <H6 fontSize={17} fontWeight={700}>
                {name}
            </H6>

            <PriceText>
                { currency(price) }
            </PriceText>

            <ProductCardShopping product={product} />
        </Content>
    </Fragment>
}