'use client'

import Link from 'next/link'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

//import { deleteContractor } from '../queries'

export function OrderActions(props) {
    const { order } = props

    return (
        <>
            <Link href={`orders/${order.id}`}>
                <StyledIconButton>
                    <EditIcon />
                </StyledIconButton>
            </Link>
            {/*
            <StyledIconButton onClick={async () => await deleteContractor(contractor.id)}>
                <DeleteIcon />
            </StyledIconButton>
            */
            }
        </>
    )
}
