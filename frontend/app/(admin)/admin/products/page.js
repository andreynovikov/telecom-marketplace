import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/product/admin/add-button'
import ProductRow from '@/components/product/admin/row'

import { getProducts } from '@/components/product/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "code",
    label: "Код",
    align: "left"
}, {
    id: "name",
    label: "Название",
    align: "left"
}, {
    id: "brand",
    label: "Бренд",
    align: "left"
}, {
    id: "category",
    label: "Категория",
    align: "left"
}, {
    id: "price",
    label: "Цена",
    align: "right"
}, {
    id: "image",
    label: "Изображения",
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

export default async function ProductList() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const products = await getProducts()

    return (
        <PageWrapper title="Товары">
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
                                {products.map(product => <ProductRow key={product.id} product={product} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
