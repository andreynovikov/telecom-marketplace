'use client'

import Button from '@mui/material/Button'
// import ButtonBase from "@mui/material/ButtonBase"

// import { H6, Paragraph } from "@/components/theme/Typography"

// import Add from "@mui/icons-material/Add"
// import Remove from "@mui/icons-material/Remove"

import useProduct from '../use-product'

import { PriceText } from './styles'

import { currency } from '@/lib'

export default function ProductCardShopping(props) {
    const { product } = props

    const {
        id,
        price
    } = product || {}

    const {
        available,
        priceFactor,
        cartItem,
        handleCartAmountChange
    } = useProduct(id)

    const handleIncrementQuantity = () => {
        handleCartAmountChange((cartItem?.quantity || 0) + 1, 'add')
    }

    const handleDecrementQuantity = () => {
        handleCartAmountChange((cartItem?.quantity || 0) - 1, 'remove')
    }

    if (!available)
        return (
            <PriceText>
                { currency(price) }
            </PriceText>
        )

    return (
        <div>
            {priceFactor}
            
            <PriceText>
                { currency(price * priceFactor) }
            </PriceText>

            <Button disableElevation color="primary" variant="contained" disabled={cartItem?.quantity > 0} onClick={handleIncrementQuantity}>
                {cartItem?.quantity > 0 ? 'В корзине' : 'В корзину'}
            </Button>
            { /* 
                <div className="button-group">
                    <ButtonBase className="base-button" onClick={handleDecrementQuantity}>
                        <Remove fontSize="small" />
                    </ButtonBase>

                    <Paragraph flex={1} fontWeight="600" lineHeight={1.75}>
                        {cartItem?.quantity}
                    </Paragraph>

                    <ButtonBase className="base-button" onClick={handleIncrementQuantity}>
                        <Add fontSize="small" />
                    </ButtonBase>
                </div>
                */
            }
        </div>
    )
}
