'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { FlexBetween } from '@/components/theme/flex-box'
import { Paragraph, Span } from '@/components/theme/Typography'

import { useCart } from '@/lib/cart'
import { currency } from '@/lib'

function ListItem({
    title,
    value,
    mb = 0.5,
    color = "grey.600"
}) {
    return <FlexBetween mb={mb}>
        <Paragraph color={color}>{title}:</Paragraph>
        <Paragraph fontWeight="700">{value ? currency(value) : "-"}</Paragraph>
    </FlexBetween>
}

export default function CheckoutSummary() {
    const { cart, priceFactor, total } = useCart()

    return <div>
        <Paragraph color="secondary.900" fontWeight={700} mb={2}>
            Ваш заказ
        </Paragraph>

        {cart.map((item) => (
            <FlexBetween key={item.id} mb={1.5}>
                <Paragraph>
                    {/*<Span fontWeight="700">{item.quantity}</Span> x */}{item.product.name}
                </Paragraph>

                <Paragraph>{currency(item.product.price * priceFactor)}</Paragraph>
            </FlexBetween>
        ))}

        <Box component={Divider} borderColor="grey.300" my={3} />

        {/*
          <ListItem title="Subtotal" value={2610} />
          <ListItem title="Shipping" />
          <ListItem title="Tax" value={40} />
          <ListItem title="Discount" mb={3} />
    
          <Box component={Divider} borderColor="grey.300" mb={1} />
          */
        }

        <ListItem title="Всего" value={total * priceFactor} color="inherit" />
    </div>
}
