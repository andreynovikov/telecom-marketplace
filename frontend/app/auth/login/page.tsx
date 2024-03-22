'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { jwtDecode } from 'jwt-decode'

import { login } from '@/lib/actions/auth'

export default function Login() {
    const [result, loginAction] = useFormState(login, {})

    useEffect(() => {
        if (result?.access_token) {
            const decoded = jwtDecode(result.access_token)
            console.log(decoded)
            localStorage.setItem('access_token', result.access_token)
        }
    }, [result])

    return (
        <form action={loginAction}>
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
