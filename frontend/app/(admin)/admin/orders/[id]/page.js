import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import OrderedProduct from '@/components/order/admin/product'
import TotalSummary from '@/components/order/admin/total'

import { getOrder, updateOrder } from '@/components/order/queries'
import { statuses } from '@/components/order/admin'

import moment from 'moment'

export default async function Order(props) {
    const params = await props.params
    const order = await getOrder(params.id)

    async function handleFormAction(formData) {
        'use server'

        const values = {}
        for (const key of formData.keys()) {
            if (key.startsWith('$')) // nextjs action fields
                continue
            values[key] = formData.get(key)
        }
        console.log(values)

        const result = await updateOrder(order.id, values)
        if (!result.success)
            throw new Error(result.error)
    }

    return (
        <PageWrapper title={`Заказ №${order.id} от ${moment(order.created).format('L LT')}`}>
            <form action={handleFormAction}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item sm={3} xs={12}>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel id="status-select-label">Статус</InputLabel>
                                        <Select
                                            labelId="status-select-label"
                                            name="status"
                                            size="small"
                                            defaultValue={order.status}
                                            label="Статус"
                                        >
                                            {Object.keys(statuses).map((status) => (
                                                <MenuItem key={status} value={status}>{statuses[status]}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={9} xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        name="comment"
                                        label="Комментарий покупателя"
                                        type="text"
                                        variant="outlined"
                                        margin="dense"
                                        maxRows={5}
                                        defaultValue={order.comment} />
                                </Grid>
                                <Grid item xs={12}>
                                    {order.items.map((item, index) => <OrderedProduct item={item} key={index} />)}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <TotalSummary total={order.total} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </PageWrapper>
    )
}
