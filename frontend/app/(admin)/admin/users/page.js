import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'

import { StyledTableHeaderCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Scrollbar from '@/components/theme/scrollbar'

import AddAction from '@/components/user/admin/add-button'
import UserRow from '@/components/user/admin/row'

import { getUsers } from '@/components/user/queries'

import { auth } from '@/lib/auth'

const tableHeading = [{
    id: "email",
    label: "Эл. почта",
    align: "left"
}, {
    id: "admin",
    label: "Администратор",
    align: "center"
}, {
    id: "action",
    label: "Действия",
    align: "center"
}];

export default async function UserList() {
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    const users = await getUsers()

    return (
        <PageWrapper title="Пользователи">
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
                                {users.map(user => <UserRow key={user.id} user={user} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
