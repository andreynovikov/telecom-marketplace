'use client'

import Link from 'next/link'

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { ContractorActions } from './actions'
import ContractorStatus from './status'

export default function ContractorRow({ contractor }) {
    const {
        id,
        name,
        inn,
        status
    } = contractor || {};

    return <StyledTableRow tabIndex={-1}>
        <StyledTableCell align="left">
            <Link href={`contractors/${contractor.id}`}>
                {name}
            </Link>
        </StyledTableCell>
        <StyledTableCell align="left">
            {inn}
        </StyledTableCell>
        <StyledTableCell align="center">
            <ContractorStatus status={status} />
        </StyledTableCell>
        <StyledTableCell align="center">
            <ContractorActions contractor={contractor} />
        </StyledTableCell>
    </StyledTableRow>
}
