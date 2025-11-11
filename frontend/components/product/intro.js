import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { FlexBox } from '@/components/theme/flex-box'
import { H1, H2, H3, H6 } from '@/components/theme/Typography'

import Brand from '@/components/brand'
import ProductShopping from './shopping'
import ProductImage from './image'

import { getProductImages } from '@/components/product/queries'

export default async function ProductIntro(props) {
    const { product } = props
    const images = await getProductImages(product.id)

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container spacing={3} sx={{ justifyContent: "space-around" }}>
                <Grid sx={{ alignItems: "center" }} size={{ md: 6, xs: 12 }}>
                    <ProductImage name={product.name} images={images} />
                </Grid>

                <Grid sx={{ alignItems: "center" }} size={{ md: 6, xs: 12 }}>
                    <H1 mb={1}>{product.name}</H1>

                    <FlexBox alignItems="center" mb={1}>
                        <div>Код товара:&nbsp;</div>
                        <div>{product.code}</div>
                    </FlexBox>

                    <FlexBox alignItems="center" mb={1}>
                        <div>Производитель:&nbsp;</div>
                        <H6><Brand id={product.brand} /></H6>
                    </FlexBox>

                    { product.stock > 0 && <FlexBox alignItems="center" mb={1}>
                        <div>Доступно:&nbsp;</div>
                        <div>{product.stock} шт.</div>
                    </FlexBox>}

                    <ProductShopping product={product} />
                </Grid>
            </Grid>
        </Box>
    )
}
