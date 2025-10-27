import { redirect } from 'next/navigation'

import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/service/admin/add-button'
import ServiceRow from '@/components/service/admin/row'

import { getServices } from '@/components/service/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "name",
    label: "Название",
    align: "left"
}, {
    id: "attachment",
    label: "Вложения",
    align: "center"
}, {
    id: "description",
    label: "Описание",
    align: "center"
}, {
    id: "action",
    label: "Действия",
    align: "center"
}];

export default async function ServiceList() {
    const session = await auth()
    if (session?.user?.role !== "admin") redirect('/login')

    const services = await getServices()

    return (
        <PageWrapper title="Услуги">
            <AddAction />
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
                                {services.map(service => <ServiceRow key={service.id} service={service} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
