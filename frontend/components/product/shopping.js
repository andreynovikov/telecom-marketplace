'use client'

import { useSession } from 'next-auth/react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { H2 } from '@/components/theme/Typography'

import { useCart } from '@/lib/cart'
import { currency } from '@/lib'

export default function ProductShopping(props) {
    const { product } = props

    const { status } = useSession()
    const { cart, available, modify } = useCart()
    const cartItem = cart.find(item => item.product.id === product.id)

    const handleCartAmountChange = amount => () => modify(product.id, amount)

    return (
        <>
            <Box pt={1} mb={3}>
                <H2 color="primary.main" mb={0.5} lineHeight="1">
                    {currency(product.price)}
                </H2>
                {/*<Box color="inherit">Stock Available</Box>*/}
            </Box>

            {available && status === 'authenticated' ? (
                <Button color="primary" variant="contained" onClick={handleCartAmountChange(1)} disabled={cartItem !== undefined} sx={{
                    mb: 4.5,
                    px: "1.75rem",
                    height: 40
                }}>
                    {cartItem === undefined ? 'Добавить в корзину' : 'В корзине'}
                </Button>
            ) : (
                <Box>
                    Для оформления заказа войдите в систему или зарегистрируйтесь, как заказчик
                </Box>
            )}
        </>
    )
}
