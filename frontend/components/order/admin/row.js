import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { OrderActions } from './actions'
import OrderStatus from './status'

import moment from 'moment'

export async function OrderRow({ order }) {
    const {
        id,
        created,
        status
    } = order || {}

    return <StyledTableRow tabIndex={-1}>
        <StyledTableCell align="center">
            {id}
        </StyledTableCell>
        <StyledTableCell align="left">
            {moment(created).format('L LT')}
        </StyledTableCell>
        <StyledTableCell align="center">
            <OrderStatus status={status} />
        </StyledTableCell>
        <StyledTableCell align="center">
            <OrderActions order={order} />
        </StyledTableCell>
    </StyledTableRow>
}
