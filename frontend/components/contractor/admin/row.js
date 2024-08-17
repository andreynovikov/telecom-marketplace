import Link from 'next/link'

import { IconCheck } from '@tabler/icons-react'

import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import PriceFactor from '@/components/price-factor'

import { ContractorActions } from './actions'
import ContractorStatus from './status'

export async function ProviderRow({ contractor }) {
    const {
        id,
        name,
        inn,
        status,
        kind
    } = contractor || {};

    return <StyledTableRow tabIndex={-1}>
        <StyledTableCell align="left">
            <Link href={`${contractor.id}`}>
                {name}
            </Link>
        </StyledTableCell>
        <StyledTableCell align="left">
            {inn}
        </StyledTableCell>
        <StyledTableCell align="center">
            <ContractorStatus status={status} kind={kind} />
        </StyledTableCell>
        <StyledTableCell align="center">
            <ContractorActions contractor={contractor} />
        </StyledTableCell>
    </StyledTableRow>
}

export async function ConsumerRow({ contractor }) {
    const {
        id,
        name,
        inn,
        end_consumer,
        price_factor,
        status,
        kind
    } = contractor || {};

    return <StyledTableRow tabIndex={-1}>
        <StyledTableCell align="left">
            <Link href={`${contractor.id}`}>
                {name}
            </Link>
        </StyledTableCell>
        <StyledTableCell align="left">
            {inn}
        </StyledTableCell>
        <StyledTableCell align="center">
            {end_consumer && <IconCheck size={20} />}
        </StyledTableCell>
        <StyledTableCell align="center">
            <PriceFactor id={price_factor} />
        </StyledTableCell>
        <StyledTableCell align="center">
            <ContractorStatus status={status} kind={kind} />
        </StyledTableCell>
        <StyledTableCell align="center">
            <ContractorActions contractor={contractor} />
        </StyledTableCell>
    </StyledTableRow>
}
