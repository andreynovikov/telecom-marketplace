'use client'

import { IconLogout } from '@tabler/icons-react'

export default function UserLogoutLink(props) {
    const { logout } = props

    const handleLogout = () => {
        logout()
    }

    return (
        <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <span>
                <IconLogout size={20} stroke={1.5} />
            </span>
            Выйти
        </a>
    )
}