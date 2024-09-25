import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import { OrderRow } from '@/components/order/admin/row'

import { getOrders } from '@/components/order/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "id",
    label: "№",
    align: "center"
}, {
    id: "created",
    label: "Дата создания",
    align: "left"
}, {
    id: "total",
    label: "Сумма",
    align: "right"
}, {
    id: "status",
    label: "Статус",
    align: "center"
}, {
    id: "action",
    label: "Действия",
    align: "center"
}]

export default async function OrderList() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const orders = await getOrders()

    return (
        <PageWrapper title="Заказы">
            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "grey.200" }}>
                                <TableRow>
                                    {tableHeading.map(headCell => (
                                        <StyledTableHeaderCell key={headCell.id} align={headCell.align}>
                                            {headCell.label}
                                        </StyledTableHeaderCell>)
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(order => <OrderRow key={order.id} order={order} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
