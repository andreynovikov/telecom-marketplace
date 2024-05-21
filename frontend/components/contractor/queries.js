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

export async function getContractor(id) {
    const session = await auth()

    if (!!!session)
        return {}

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors/${id}`, {
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
    const values = {}
    for (const key of formData.keys()) {
        if (key.startsWith('$'))
            continue
        if (['geography'].includes(key))
            values[key] = formData.getAll(key)
        else
            values[key] = formData.get(key)
    }
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
