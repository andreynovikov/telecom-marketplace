import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import BrandActions from './actions'


export default async function BrandRow({ brand }) {
    return (
        <>
            <StyledTableRow tabIndex={-1}>
                <StyledTableCell align="left">
                    {brand.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <BrandActions brand={brand} />
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}
