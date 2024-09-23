'use server'

import { auth } from '@/lib/auth'

export async function getCart() {
    const session = await auth()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart`, {
        headers: {
            'Authorization': `Bearer ${session?.user?.access_token}`,
        }
    })

    if (!res.ok) {
        if (res.status === 401 || res.status === 422)
            return []

        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function updateCart(product, quantity) {
    const values = {
        product,
        quantity
    }
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const result = await response.json()
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

export async function deleteCart() {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()
        if (response.ok) {
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
