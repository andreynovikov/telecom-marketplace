import Typography from '@mui/material/Typography'

import { ServiceActions } from '@/components/service/admin/actions'

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { getServiceFiles } from '../queries'

import { rupluralize } from '@/lib'

export default async function ServiceRow({ service, category }) {
    const files = await getServiceFiles(service.id)

    return <StyledTableRow tabIndex={-1} role="checkbox" selected={false}>
        <StyledTableCell align="left">
            {service?.name}
            {files?.length > 0 && (
                <>
                    {' '}
                    <Typography component="span" color="grey.600" noWrap>
                        ({files.length} {rupluralize(files.length, ['вложение', 'вложения', 'вложений'])})
                    </Typography>
                </>
            )}
        </StyledTableCell>
        <StyledTableCell align="center">
            <ServiceActions service={{ files, ...service }} categoryId={category.id} />
        </StyledTableCell>
    </StyledTableRow>
}