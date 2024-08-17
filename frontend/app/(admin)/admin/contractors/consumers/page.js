import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import { ConsumerRow } from '@/components/contractor/admin/row'

import { getContractors } from '@/components/contractor/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "name",
    label: "Название",
    align: "left"
}, {
    id: "inn",
    label: "ИНН",
    align: "left"
}, {
    id: "end_consumer",
    label: "Конечный потребитель",
    align: "center"
}, {
    id: "price_factor",
    label: "Категория цен",
    align: "center"
}, {
    id: "status",
    label: "Статус",
    align: "center"
}, {
    id: "action",
    label: "Действия",
    align: "center"
}];

export default async function ConsumerList() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const contractors = await getContractors([{ field: 'kind', value: 2 }])

    console.log(contractors)
    return (
        <PageWrapper title="Заказчики">
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
                                {contractors.map(contractor => <ConsumerRow key={contractor.id} contractor={contractor} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
