import { Suspense } from 'react'

import SignUpForm from '@/components/auth/register-form'

export default async function SignUp() {
    return (
        <Suspense>
            <SignUpForm />
        </Suspense>
    )
}
