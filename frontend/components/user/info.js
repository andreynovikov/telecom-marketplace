import Link from 'next/link'

import { auth, signOut } from '@/lib/auth'

export default async function UserInfo() {
    const session = await auth()

    const handleLogout = async () => {
        'use server'
        await signOut({
            redirectTo: '/'
        })
    }

    return (
        <div>
            <form action={handleLogout}>
                <button type="submit">Выйти</button>
            </form>
            <Link href="/auth/login">Войти</Link>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    )
}
