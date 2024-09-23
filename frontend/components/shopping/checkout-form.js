'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import { FlexBox } from "@/components/theme/flex-box"
import { Paragraph } from "@/components/theme/Typography"

import { createOrder } from '@/components/order/queries'

import { useCart } from '@/lib/cart'

function Heading({
    number,
    title,
    ...props
}) {
    return <FlexBox gap={1.5} alignItems="center" mb={3.5} {...props}>
        {number ? <Avatar alt={title} sx={{
            width: 32,
            height: 32,
            color: "primary.text",
            backgroundColor: "primary.main"
        }}>
            {number}
        </Avatar> : null}
        <Paragraph fontSize={20}>{title}</Paragraph>
    </FlexBox>
}

export default function CheckoutForm() {
    const router = useRouter()
    const { cart, clear } = useCart()
    const createOrderWithCart = createOrder.bind(null, cart)
    const [state, dispatch] = useFormState(createOrderWithCart, {success: null})

    useEffect(() => {
        if (state.success) {
            (async () => clear())()
            router.push(`/checkout/complete?order=${state.data.id}`)
        }
    }, [state, router, clear])

    return (
        <form action={dispatch}>
            <Card sx={{ p: 3, mb: 3 }}>
                <Heading number={0} title="Детали заказа" />

                <Box mb={3}>
                    <TextField fullWidth multiline minRows={4} maxRows={15} type="text" name="comment" label="Комментарий к заказу" />
                </Box>

                <Button type="submit" color="primary" variant="contained">
                    Оформить заказ
                </Button>
            </Card>
        </form>
    )
}
