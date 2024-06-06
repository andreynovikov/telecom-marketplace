'use client'

import Link from 'next/link'

import Delete from '@mui/icons-material/Delete'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'

import { StyledTableRow, StyledTableCell, StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { deleteContractor } from '../queries'

export default function ContractorRow({ contractor }) {
    const {
        id,
        name,
        inn
    } = contractor || {};

    return <StyledTableRow tabIndex={-1}>
        <StyledTableCell align="left">
            {name}
        </StyledTableCell>
        <StyledTableCell align="left">
            {inn}
        </StyledTableCell>
        <StyledTableCell align="center">
            <Link href={`contractors/${contractor.id}`}>
                <StyledIconButton>
                    <RemoveRedEye />
                </StyledIconButton>
            </Link>
            <StyledIconButton onClick={async () => await deleteContractor(id) }>
                <Delete />
            </StyledIconButton>
        </StyledTableCell>
    </StyledTableRow>
}
