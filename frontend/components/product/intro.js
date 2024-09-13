import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { FlexBox, FlexRowCenter } from '@/components/theme/flex-box'
import { H1, H2, H3, H6 } from '@/components/theme/Typography'
import LazyImage from '@/components/theme/LazyImage'

import Brand from '@/components/brand'

import { currency } from '@/lib'

export default async function ProductIntro(props) {
    const { product } = props

    return <Box width="100%">
        <Grid container spacing={3} justifyContent="space-around">
            <Grid item md={6} xs={12} alignItems="center">
                <FlexBox borderRadius={3} overflow="hidden" justifyContent="center" mb={6}>
                    <LazyImage
                        alt={product.name}
                        width={300}
                        height={300}
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

                <Box pt={1} mb={3}>
                    <H2 color="primary.main" mb={0.5} lineHeight="1">
                        {currency(product.price)}
                    </H2>
                    {/*<Box color="inherit">Stock Available</Box>*/}
                </Box>

                {/*
                {!cartItem?.qty ? <Button color="primary" variant="contained" onClick={handleCartAmountChange(1)} sx={{
                    mb: 4.5,
                    px: "1.75rem",
                    height: 40
                }}>
                    Add to Cart
                </Button> : <FlexBox alignItems="center" mb={4.5}>
                    <Button size="small" sx={{
                        p: 1
                    }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                        <Remove fontSize="small" />
                    </Button>

                    <H3 fontWeight="600" mx={2.5}>
                        {cartItem?.qty.toString().padStart(2, "0")}
                    </H3>

                    <Button size="small" sx={{
                        p: 1
                    }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                        <Add fontSize="small" />
                    </Button>
                </FlexBox>}
                */
                }
            </Grid>
        </Grid>
    </Box>
}
