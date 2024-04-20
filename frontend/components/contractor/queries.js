'use server'

import { auth } from '@/lib/auth'

export async function getContractors() {
    const session = await auth()

    if (!!!session)
        return {}

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors`, {
        headers: {
            'Authorization': `Bearer ${session?.user?.access_token}`
        }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error(await res.json())
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function saveContractor(_currentState, formData) {
    const values = Object.fromEntries(Object.entries(Object.fromEntries(formData.entries())).filter(([key]) => !key.startsWith('$'))) // TODO: refactor
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
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
