import { redirect } from 'next/navigation'

import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import PageWrapper from '@/components/theme/pages-sections/vendor-dashboard/page-wrapper'
import Scrollbar from '@/components/theme/scrollbar'

import { StyledTableHeaderCell, StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { auth } from '@/lib/auth'

import { getSubjects } from '@/components/subject/queries'

const tableHeading = [{
    id: "code",
    label: "Код",
    align: "center"
}, {
    id: "name",
    label: "Название",
    align: "left"
}];

export default async function SubjectList() {
    const subjects = await getSubjects()
    const session = await auth()
    if (session?.user?.role !== "admin") redirect('/login')

    return (
        <PageWrapper title="Субъекты">
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
                                {subjects.map(subject => (
                                    <StyledTableRow key={subject.code} tabIndex={-1}>
                                        <StyledTableCell align="center">
                                            {subject.code.toString().padStart(2, '0')}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {subject.name}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    )
}
