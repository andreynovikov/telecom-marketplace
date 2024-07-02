import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Scrollbar from '@/components/theme/scrollbar'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'
import { FlexBox } from '@/components/theme/flex-box'

import Actions from '@/components/contractor/admin/buttons'
import Service from '@/components/service'
import Subject from '@/components/subject'

import { getContractor, updateContractor } from '@/components/contractor/queries'
import FileDownload from '@/components/ui/file-download'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

const checkboxProps = {
    size: "small",
    checkedIcon: <CheckCircleOutlineIcon color="success" />,
    icon: <RemoveCircleOutlineIcon color="error" />,
    disableRipple: true,
    sx: { p: 0.5, pl: 0 }
}

export default async function Contractor({ params }) {
    const contractor = await getContractor(params.id)

    async function handleFormAction(formData) {
        'use server'

        const values = {}
        for (const key of formData.keys()) {
            if (key.startsWith('$')) // nextjs action fields
                continue
            if (['catalogue', 'geography'].includes(key))
                values[key] = formData.getAll(key)
            else
                values[key] = formData.get(key)
        }
        console.log(values)

        const result = await updateContractor(contractor.id, values)
        if (!result.success)
            throw new Error(result.error)
    }

    return (
        <PageWrapper title={contractor.name}>
            <Actions contractor={contractor} />
            <Card sx={{ p: 3 }} component="form" action={handleFormAction}>
                <Scrollbar>
                    <Grid container spacing={3}>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                Название
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            <TextField
                                fullWidth
                                name="name"
                                type="text"
                                variant="standard"
                                defaultValue={contractor.name} />
                        </Grid>
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
                            <TextField
                                fullWidth
                                name="legal_address"
                                type="text"
                                variant="standard"
                                defaultValue={contractor.legal_address} />
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                Контактный телефон
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            <TextField
                                fullWidth
                                name="contact_phone"
                                type="text"
                                variant="standard"
                                defaultValue={contractor.contact_phone} />
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
                            {contractor.services.map((item) => (
                                <FlexBox key={item.id} alignItems="center">
                                    <Checkbox
                                        name="catalogue"
                                        value={item.id}
                                        defaultChecked={item.approved}
                                        {...checkboxProps} />
                                    <Service id={item.id} />
                                </FlexBox>
                            ))}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Typography color="grey.600">
                                География услуг
                            </Typography>
                        </Grid>
                        <Grid item sm={9} xs={12}>
                            {contractor.geography.map((item) => (
                                <FlexBox key={item.code} alignItems="center">
                                    <Checkbox
                                        name="geography"
                                        value={item.code}
                                        defaultChecked={item.approved}
                                        {...checkboxProps} />
                                    <Subject code={item.code} />
                                </FlexBox>
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="comment"
                                label="Комментарий"
                                helperText="Не виден поставщику"
                                multiline
                                rows={4}
                                defaultValue={contractor.comment}
                                InputLabelProps={{ shrink: !!contractor.comment ? true : undefined }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
