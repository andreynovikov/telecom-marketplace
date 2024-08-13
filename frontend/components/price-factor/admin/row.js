import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import PriceFactorActions from './actions'


export default async function PriceFactorRow({ factor }) {
    return (
        <>
            <StyledTableRow tabIndex={-1}>
                <StyledTableCell align="left">
                    {factor.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {factor.factor}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <PriceFactorActions factor={factor} />
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}
