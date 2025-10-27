'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { H2 } from '@/components/theme/Typography'

import useProduct from './use-product'

import { currency } from '@/lib'

export default function ProductShopping(props) {
    const { product } = props

    const {
        available,
        priceFactor,
        cartItem,
        handleCartAmountChange
    } = useProduct(product.id)

    const handleIncrementQuantity = () => {
        handleCartAmountChange((cartItem?.quantity || 0) + 1, 'add')
    }

    return (
        <>
            <Box pt={1} mb={3}>
                <H2 color="primary.main" mb={0.5} lineHeight="1">
                    {currency(product.price * priceFactor)}
                </H2>
                {/*<Box color="inherit">Stock Available</Box>*/}
            </Box>

            {available ? (
                <Button color="primary" variant="contained" onClick={handleIncrementQuantity} disabled={cartItem?.quantity > 0} sx={{
                    mb: 4.5,
                    px: "1.75rem",
                    height: 40
                }}>
                    {cartItem?.quantity > 0 ? 'В корзине' : 'Добавить в корзину'}
                </Button>
            ) : false ? (
                <Box>
                    Для оформления заказа войдите в систему или зарегистрируйтесь, как заказчик
                </Box>
            ) : null} {/* Disabled login */}
        </>
    )
}
