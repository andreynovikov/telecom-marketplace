'use client'

import Link from 'next/link'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { deleteContractor } from '../queries'

export function ContractorActions(props) {
    const { contractor } = props

    return (
        <>
            <Link href={`contractors/${contractor.id}`}>
                <StyledIconButton>
                    <EditIcon />
                </StyledIconButton>
            </Link>

            <StyledIconButton onClick={async () => await deleteContractor(contractor.id)}>
                <DeleteIcon />
            </StyledIconButton>
        </>
    )
}
