import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/price-factor/admin/add-button'
import PriceFactorRow from '@/components/price-factor/admin/row'

import { getPriceFactors } from '@/components/price-factor/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "name",
    label: "Название",
    align: "left"
}, {
    id: "factor",
    label: "Коэффициент",
    align: "center"
}, {
    id: "action",
    label: "Действия",
    align: "center"
}];

export default async function PriceFactorList() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const factors = await getPriceFactors()

    return (
        <PageWrapper title="Коэфициенты цен">
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
                                {factors.map(factor => <PriceFactorRow key={factor.id} factor={factor} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
