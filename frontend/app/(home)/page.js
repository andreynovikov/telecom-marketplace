import Grid from '@mui/material/Grid'

import { Paragraph } from '@/components/theme/Typography'

import ProductCard from '@/components/product/product-card'

import { getProducts } from '@/components/product/queries'

export const revalidate = 0

export default async function Index() {
    const products = await getProducts()

    return (
        <div className="mb-4">
            <Paragraph fontSize={18} fontWeight={600} mb={3}>
                Все товары
            </Paragraph>

            <Grid container spacing={3}>
                {products.map(product => <Grid key={product.id} size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                    <ProductCard product={product} />
                </Grid>)}
            </Grid>
        </div>
    )
}
