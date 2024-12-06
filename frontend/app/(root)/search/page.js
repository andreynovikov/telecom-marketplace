'use client'

import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ProductCard from '@/components/product/product-card'

import { getProducts } from '@/components/product/queries'
import { Paragraph } from '@/components/theme/Typography'

export default function SearchResults(props) {
    const [products, setProducts] = useState(undefined)

    const searchParams = props.searchParams
    const query = searchParams.q

    useEffect(() => {
        if (query === undefined || query.length === 0)
            return

        setProducts(undefined)
        getProducts([{
            field: 'text',
            value: query
        }]).then(result => setProducts(result))
    }, [query, setProducts])

    if (query === undefined || query.length === 0)
        return (
            <Box fontSize={25} sx={{ m: 5 }}>
                Необходимо указать поисковый запрос
            </Box>
        )

    return (
        <Container sx={{ my: 2 }}>
            <Typography variant="h2" component="h3" sx={{ mb: 2 }}>
                Результаты поиска
                &laquo;{query}&raquo;
            </Typography>
            {products === undefined ? (
                <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 200 }}>
                    <CircularProgress size={80} />
                </Stack>
            ) : products.length > 0 && (
                <>
                    <Box sx={{ p: 2 }} className="bg-white">
                        <Paragraph fontSize={18} fontWeight={600} mb={3}>
                            Товары
                        </Paragraph>
                        <Grid container spacing={3}>
                            {products.map(product => <Grid item xl={3} md={4} sm={6} xs={12} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>)}
                        </Grid>
                    </Box>
                </>
            )}
        </Container>
    )
}
