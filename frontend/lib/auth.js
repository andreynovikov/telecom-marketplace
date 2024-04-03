import { createContext, useContext, useState, useEffect, useMemo } from 'react'

import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({
    status: 'unauthenticated',
    login: () => {},
    logout: () => {}
})

export async function signUp(formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include"
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            // __SESSION.invalidate()
            return result
        } else {
            console.error(result.msg)
            return {
                error: result.msg
            }
        }
    } catch (error) {
        console.error("Error: " + error)
        return {
            error
        }
    }
}

export async function signIn(formData) {
    const values = Object.fromEntries(formData.entries())

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include"
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            return result
        } else {
            console.error(result.msg)
            return {
                error: result.msg
            }
        }
    } catch (error) {
        console.error("Error: " + error)
        return {
            error
        }
    }
}

export function useAuth(options) {
    const value = useContext(AuthContext)

    const { onUnauthenticated } = options || {}
    const requiredAndNotLoading = onUnauthenticated !== undefined && value.status === 'unauthenticated'

    useEffect(() => {
        if (requiredAndNotLoading)
            onUnauthenticated();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [requiredAndNotLoading])

    if (requiredAndNotLoading)
        return { ...value, status: 'loading' }

    return value;
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState()

    useEffect(() => {
        setSession(localStorage.getItem('session'))
    }, [])

    const value = useMemo(() => ({
        ...(session ? JSON.parse(session) : {}),
        status: /*isLoading ? 'loading'*/ session ? 'authenticated' : 'unauthenticated',
        login: (session) => {
            const decoded = jwtDecode(session.access_token)
            console.log(decoded)
            const encoded = JSON.stringify(session)
            localStorage.setItem('session', encoded)
            setSession(encoded)
        },
        logout: () => {
            localStorage.removeItem('session')
            setSession(null)
        }
    }), [session]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
