import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import CheckoutForm from '@/components/shopping/checkout-form'
import CheckoutSummary from '@/components/shopping/checkout-summary'

export default function CheckoutPage() {
    return (
        <Container sx={{ my: "1.5rem" }}>
            <Grid container spacing={3}>
                <Grid size={{ lg: 8, md: 8, xs: 12 }}>
                    <CheckoutForm />
                </Grid>

                <Grid size={{ lg: 4, md: 4, xs: 12 }}>
                    <CheckoutSummary />
                </Grid>
            </Grid>
        </Container>
    )
}
