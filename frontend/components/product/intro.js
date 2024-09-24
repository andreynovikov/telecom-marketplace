import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { FlexBox, FlexRowCenter } from '@/components/theme/flex-box'
import { H1, H2, H3, H6 } from '@/components/theme/Typography'
import LazyImage from '@/components/theme/LazyImage'

import Brand from '@/components/brand'
import ProductShopping from './shopping'

export default async function ProductIntro(props) {
    const { product } = props

    return <Box width="100%">
        <Grid container spacing={3} justifyContent="space-around">
            <Grid item md={6} xs={12} alignItems="center">
                <FlexBox borderRadius={3} overflow="hidden" justifyContent="center" mb={6}>
                    <LazyImage
                        alt={product.name}
                        width={1411}
                        height={940}
                        loading="eager"
                        src={`${process.env.NEXT_PUBLIC_MEDIA_ROOT}${product.image.src}`}
                        sx={{
                            objectFit: "contain"
                        }} />
                </FlexBox>

                {/*
                <FlexBox overflow="auto">
                    {images.map((url, ind) => <FlexRowCenter key={ind} width={64} height={64} minWidth={64} bgcolor="white" border="1px solid" borderRadius="10px" ml={ind === 0 ? "auto" : 0} style={{
                        cursor: "pointer"
                    }} onClick={handleImageClick(ind)} mr={ind === images.length - 1 ? "auto" : "10px"} borderColor={selectedImage === ind ? "primary.main" : "grey.400"}>
                        <Avatar alt="product" src={url} variant="square" sx={{
                            height: 40
                        }} />
                    </FlexRowCenter>)}
                </FlexBox>
                */
                }
            </Grid>

            <Grid item md={6} xs={12} alignItems="center">
                <H1 mb={1}>{product.name}</H1>

                <FlexBox alignItems="center" mb={1}>
                    <div>Код товара:&nbsp;</div>
                    <div>{product.code}</div>
                </FlexBox>

                <FlexBox alignItems="center" mb={1}>
                    <div>Производитель:&nbsp;</div>
                    <H6><Brand id={product.brand} /></H6>
                </FlexBox>

                <ProductShopping product={product} />
            </Grid>
        </Grid>
    </Box>
}
