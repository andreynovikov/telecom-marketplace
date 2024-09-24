'use server'

import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'

export async function getOrders(filters=null) {
    const session = await auth()

    if (!!!session)
        return {}

    const url = new URL(`${process.env.NEXT_PUBLIC_API_ROOT}/orders`)

    if (filters !== null)
        for (const filter of filters)
            if (Array.isArray(filter.value)) {
                for (const value of filter.value)
                    url.searchParams.append(filter.field, value)
            } else {
                url.searchParams.append(filter.field, filter.value)
            }

    const res = await fetch(url.toString(), {
        next: {
            revalidate: 600,
            tags: ['orders']
        },
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

export async function getOrder(orderId) {
    const session = await auth()

    if (!!!session)
        return {}

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/orders/${orderId}`, {
        next: {
             tags: `orders__${orderId}`
            },
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

export async function createOrder(cart, _currentState, formData) {
    const values = {}
    for (const key of formData.keys()) {
        if (key.startsWith('$')) // nextjs action fields
            continue
        values[key] = formData.get(key)
    }

    values['items'] = cart.map(item => (
        {
            'product': item.product.id,
            'quantity': item.quantity
        }
    ))

    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/orders`, {
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
            revalidateTag('orders')
            return {
                success: true,
                data: result
            }
        } else {
            console.error(result.msg)
            return {
                success: false,
                error: result.msg
            }
        }
    } catch (error) {
        console.error("Error: " + error)
        return {
            success: false,
            error
        }
    }
}

export async function updateOrder(orderId, values) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const result = await response.json();
        if (response.ok) {
            revalidateTag('orders')
            revalidateTag(`orders__${orderId}`)
            return {
                success: true,
                data: result
            }
        } else {
            console.error("Error message", result.msg)
            return {
                success: false,
                error: result.msg
            }
        }
    } catch (error) {
        console.error("Error: " + error)
        return {
            success: false,
            error
        }
    }
}
