import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import UserActions from './actions'


export default async function UserRow({ user }) {
    return (
        <StyledTableRow tabIndex={-1}>
            <StyledTableCell align="left">
                {user.email}
            </StyledTableCell>
            <StyledTableCell align="center">
                {user.admin && <CheckCircleOutlineIcon fontSize="small" />}
            </StyledTableCell>
            <StyledTableCell align="center">
                <UserActions user={user} />
            </StyledTableCell>
        </StyledTableRow>
    )
}
