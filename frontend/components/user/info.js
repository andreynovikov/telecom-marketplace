'use client'

import Link from 'next/link'

import { useAuth } from '@/lib/auth'

export default function UserInfo() {
    const auth = useAuth()

    return (
        <div>
            {auth.status === 'authenticated' ? (
                <a href="" onClick={() => auth.logout()}>Выйти</a>
            ) : (
                <Link href="/auth/login">Войти</Link>
            )}
            <pre>
                {JSON.stringify(auth, null, 2)}
            </pre>
        </div>
    )
}
