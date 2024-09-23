'use server'

import { auth } from '@/lib/auth'

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
