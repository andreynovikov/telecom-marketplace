import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { H3 } from '@/components/theme/Typography'

import ProductCard from './related-product-card'

import { getRelatedProducts } from './queries'

export default async function RelatedProducts({ product }) {
    const products = await getRelatedProducts(product)

    return (
        <Box sx={{ mb: 7.5 }}>
            <H3 mb={3}>Другие товары</H3>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
                        <ProductCard hoverEffect product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
