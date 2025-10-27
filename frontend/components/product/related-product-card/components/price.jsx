'use client'

import useProduct from '@/components/product/use-product'

import { currency } from '@/lib'

export default function Price({ product }) {
    const {
        priceFactor,
    } = useProduct(product.id)

    return currency(product.price * priceFactor)
}