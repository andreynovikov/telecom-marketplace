'use client'

import { useState } from 'react'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import ContractorLink from './contractor-link'
import UserEditDialog from './form'
import { deleteUser } from '../queries'

export default function UserActions({ user }) {
    const [userOpen, setUserOpen] = useState(false)

    return (
        <>
            <ContractorLink userId={user?.id} />
            <StyledIconButton onClick={() => setUserOpen(true)}>
                <EditIcon />
            </StyledIconButton>
            {user?.id !== 1 && (
                <StyledIconButton onClick={async () => await deleteUser(user?.id)}>
                    <DeleteIcon />
                </StyledIconButton>
            )}
            <UserEditDialog user={user} open={userOpen} setOpen={setUserOpen} />
        </>
    )
}
