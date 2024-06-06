import { ServiceActions } from '@/components/service/admin/actions'

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

export default function ServiceRow({ service, category }) {
    return <StyledTableRow tabIndex={-1} role="checkbox" selected={false}>
        <StyledTableCell align="left">
            {service?.name}
        </StyledTableCell>
        <StyledTableCell align="center">
            <ServiceActions service={service} categoryId={category.id} />
        </StyledTableCell>
    </StyledTableRow>
}