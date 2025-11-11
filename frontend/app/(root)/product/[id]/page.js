import Container from '@mui/material/Container'

import ProductDescription from '@/components/product/description'
import ProductIntro from '@/components/product/intro'

import { getProducts, getProduct } from '@/components/product/queries'
import RelatedProducts from '@/components/product/related'

export default async function Product(props) {
    const params = await props.params
    const product = await getProduct(params.id)

    return <Container sx={{ my: 2 }}>
        <ProductIntro product={product} />
        <ProductDescription product={product} />
        <RelatedProducts product={product} />
    </Container>
}

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
    const products = await getProducts()

    return products.map((product) => ({
        id: String(product.id)
    }))
}
