import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Scrollbar from '@/components/theme/scrollbar'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import Subject from '@/components/subject'

import { getContractor } from '@/components/contractor/queries'

export default async function Contractor({ params }) {
    const contractor = await getContractor(params.id)

    return (
        <PageWrapper title={contractor.name}>
            <Card sx={{ p: 3 }}>
                <Scrollbar>
                    <Grid container spacing={3}>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                ИНН
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.inn}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                Юридический адрес
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.legal_address}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                Информация о компании
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.cover_letter}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                Опыт работы
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.experience}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                География услуг
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.geography.map((code) => (
                                <div key={code}>
                                    <Subject code={code} />
                                </div>
                            ))}
                        </Grid>
                    </Grid>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
