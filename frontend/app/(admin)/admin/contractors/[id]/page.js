import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Scrollbar from '@/components/theme/scrollbar'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import Actions from '@/components/contractor/admin/buttons'
import Service from '@/components/service'
import Subject from '@/components/subject'

import { getContractor } from '@/components/contractor/queries'
import FileDownload from '@/components/ui/file-download'

export default async function Contractor({ params }) {
    const contractor = await getContractor(params.id)

    return (
        <PageWrapper title={contractor.name}>
            <Actions contractor={contractor} />
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
                                Перечень услуг
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.services.map((id) => (
                                <div key={id}>
                                    <Service id={id} />
                                </div>
                            ))}
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
                        {contractor.cover_file && (
                            <>
                                <Grid item sm={3} xs={12}>
                                    <Typography color="grey.600">
                                        Файл с информацией о компании
                                    </Typography>
                                </Grid>
                                <Grid item sm={9} xs={12}>
                                    <FileDownload owner={contractor.users[0]} fileName={contractor.cover_file} />
                                </Grid>
                            </>
                        )}
                        {contractor.experience_file && (
                            <>
                                <Grid item sm={3} xs={12}>
                                    <Typography color="grey.600">
                                        Файл с опытом работы
                                    </Typography>
                                </Grid>
                                <Grid item sm={9} xs={12}>
                                    <FileDownload owner={contractor.users[0]} fileName={contractor.experience_file} />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
