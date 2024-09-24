import Grid from '@mui/material/Grid'

import { H6, Paragraph } from '@/components/theme/Typography'

import { currency } from "@/lib"

export default function OrderedProduct({ item }) {
    return <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <H6>{item.product.name}</H6>
                <Paragraph fontSize={14} color="grey.600">
                    {currency(item.price)}
                </Paragraph>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paragraph fontSize={14} color="grey.600" align="right">
                    {currency(item.cost)} x {item.quantity} шт.
                </Paragraph>
                {/*
                <Box maxWidth={60}>
                    <TextField defaultValue={item.quantity} type="number" fullWidth />
                </Box>
                */
                }
            </Grid>
        </Grid>
}