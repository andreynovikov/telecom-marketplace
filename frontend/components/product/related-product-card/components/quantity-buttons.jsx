'use client'

import Button from '@mui/material/Button'

import { FlexBox } from '@/components/theme/flex-box'

import { PlusIcon, MinusIcon } from '@/theme/icons'

import useProduct from '@/components/product/use-product'

export default function QuantityButtons({ product }) {
    const {
        cartItem,
        handleCartAmountChange
    } = useProduct(product.id)

    const quantity = cartItem?.quantity || 0

    const handleIncrementQuantity = () => {
        handleCartAmountChange(quantity + 1, 'add')
    }

    const handleDecrementQuantity = () => {
        handleCartAmountChange(quantity - 1, 'remove')
    }

    return <FlexBox width="30px" alignItems="center" className="add-cart" flexDirection="column-reverse" justifyContent={quantity ? "space-between" : "flex-start"}>
        {quantity == 0 && (
            <Button color="primary" variant="outlined" onClick={handleIncrementQuantity} sx={{ padding: "3px" }}>
                <PlusIcon fontSize="small" />
            </Button>
        )}

        {quantity > 0 && (
            <Button color="primary" variant="outlined" onClick={handleDecrementQuantity} sx={{ padding: "3px" }}>
                <MinusIcon fontSize="small" />
            </Button>
        )}
    </FlexBox>
}