import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { FlexBetween } from '@/components/theme/flex-box'
import { Paragraph } from '@/components/theme/Typography'

import ProductCard from '@/components/product/product-card'

import { getProducts } from '@/components/product/queries'
import { getCategories, getCategory } from '@/components/product/category/queries'

export default async function Products({ params }) {
    const { id } = params

    const category = await getCategory(id)

    const products = await getProducts([{
        field: 'category',
        value: id
    }])

    return (
        <div className="mb-4">
            <FlexBetween mb={3}>
                <Paragraph fontSize={18} fontWeight={600}>
                    {category.name}
                </Paragraph>
                <Link href="/" passHref>
                    <Button variant="outlined" size="small" color="secondary" sx={{ textTransform: "none" }}>
                        Все товары
                    </Button>
                </Link>
            </FlexBetween>

            <Grid container spacing={3}>
                {products.map(product => <Grid item xl={3} md={4} sm={6} xs={12} key={product.id}>
                    <ProductCard product={product} />
                </Grid>)}
            </Grid>

            <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Link href={`/export/products?category=${id}`} passHref>
                    <Button variant="outlined" size="small" color="secondary" sx={{ textTransform: "none" }}>
                        Скачать в виде таблицы
                    </Button>
                </Link>
            </Box>
        </div>
    )
}

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
    const categories = await getCategories()

    return categories.map((category) => ({
        id: String(category.id)
    }))
}
