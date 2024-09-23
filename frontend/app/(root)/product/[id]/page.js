import Container from '@mui/material/Container'

import ProductDescription from '@/components/product/description'
import ProductIntro from '@/components/product/intro'

import { getProducts, getProduct } from '@/components/product/queries'

export default async function Product({ params }) {
    const product = await getProduct(params.id)

    return <Container className="mt-2 mb-2">
        <ProductIntro product={product} />
        <ProductDescription product={product} />
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
