import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/category/admin/add-button'
import CategoryRow from '@/components/category/admin/row'

import { getCategories } from '@/components/category/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "name",
    label: "Категория",
    align: "left"
}, {
    id: "services",
    label: "Услуги",
    align: "left"
}, {
    id: "action",
    label: "Действия",
    align: "center"
}];

export default async function CategoryList() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const categories = await getCategories()

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
                                {categories.map(category => <CategoryRow key={category.id} category={category} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
