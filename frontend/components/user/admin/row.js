import { IconCheck } from '@tabler/icons-react'

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import UserActions from './actions'


export default async function UserRow({ user }) {
    return (
        <StyledTableRow tabIndex={-1}>
            <StyledTableCell align="left">
                {user.email}
            </StyledTableCell>
            <StyledTableCell align="left">
                {user.name}
            </StyledTableCell>
            <StyledTableCell align="left">
                {user.phone || '-'}
            </StyledTableCell>
            <StyledTableCell align="center">
                {user.admin && <IconCheck size={20} />}
            </StyledTableCell>
            <StyledTableCell align="center">
                <UserActions user={user} />
            </StyledTableCell>
        </StyledTableRow>
    )
}
