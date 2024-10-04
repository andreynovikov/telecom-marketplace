import { ServiceActions } from '@/components/service/admin/actions'

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { getServiceFiles } from '../queries'

export default async function ServiceRow({ service }) {
    const files = await getServiceFiles(service.id)

    return <StyledTableRow tabIndex={-1} role="checkbox" selected={false}>
        <StyledTableCell align="left">
            {service.name}
        </StyledTableCell>
        <StyledTableCell align="center">
            {files?.length > 0 ? files.length : '-'}
        </StyledTableCell>
        <StyledTableCell align="center">
            {service.description ? 'есть' : '-'}
        </StyledTableCell>
        <StyledTableCell align="center">
            <ServiceActions service={{ files, ...service }} />
        </StyledTableCell>
    </StyledTableRow>
}