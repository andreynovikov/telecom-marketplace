'use client'

import { useState } from 'react'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import UserEditDialog from './form'
import { deleteUser } from '../queries'

export default function UserActions({ user }) {
    const [userOpen, setUserOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setUserOpen(true)}>
                <Edit />
            </StyledIconButton>
            {user?.id !== 1 && (
                <StyledIconButton onClick={async () => await deleteUser(user?.id)}>
                    <Delete />
                </StyledIconButton>
            )}
            <UserEditDialog user={user} open={userOpen} setOpen={setUserOpen} />
        </>
    )
}
