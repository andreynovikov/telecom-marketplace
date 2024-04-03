'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { signIn, useAuth } from '@/lib/auth'

export default function Login() {
    const { login } = useAuth()

    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await signIn(new FormData(event.currentTarget))
        console.log(result)
        if (result?.access_token) {
            login(result)
            router.push(searchParams.get('callbackUrl') || '/')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input type="text" className="form-control" id="inputEmail" name="email" />
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
