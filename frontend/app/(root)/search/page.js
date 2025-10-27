import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ProductCard from '@/components/product/product-card'

import { getProducts } from '@/components/product/queries'
import { getServices } from '@/components/service/queries'
import { Paragraph } from '@/components/theme/Typography'
import Link from 'next/link'

export default async function SearchResults(props) {
    const searchParams = props.searchParams
    const query = searchParams.q

    if (query === undefined || query.length === 0)
        return (
            <Box fontSize={25} sx={{ m: 5 }}>
                Необходимо указать поисковый запрос
            </Box>
        )

    const products = await getProducts([{
        field: 'text',
        value: query
    }])

    const services = await getServices([{
        field: 'text',
        value: query
    }])

    return (
        <Container sx={{ my: 2 }}>
            <Typography variant="h2" component="h3" sx={{ mb: 2 }}>
                Результаты поиска
                &laquo;{query}&raquo;
            </Typography>
            {products === undefined || services === undefined ? (
                <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 200 }}>
                    <CircularProgress size={80} />
                </Stack>
            ) : (
                <>
                    {products.length > 0 && (
                        <>
                            <Box sx={{ p: 2 }} className="bg-white">
                                <Paragraph fontSize={18} fontWeight={600} mb={3}>
                                    Товары
                                </Paragraph>
                                <Grid container spacing={3}>
                                    {products.map(product => <Grid item md={3} sm={6} xs={12} key={product.id}>
                                        <ProductCard product={product} />
                                    </Grid>)}
                                </Grid>
                            </Box>
                        </>
                    )}
                    {services.length > 0 && (
                        <>
                            <Box sx={{ p: 2 }} className="bg-white">
                                <Paragraph fontSize={18} fontWeight={600} mb={3}>
                                    Услуги
                                </Paragraph>
                                {services.map(service => <Paragraph mb={1} fontSize={16} key={service.id}>
                                    <Link href={`/service/${service.id}`}>{service.name}</Link>
                                </Paragraph>)}
                            </Box>
                        </>
                    )}
                    {products.length === 0 && services.length === 0 && (
                        <Box fontSize={25} sx={{ m: 5 }}>
                            Ничего не найдено
                        </Box>
                    )}
                </>
            )}
        </Container>
    )
}
