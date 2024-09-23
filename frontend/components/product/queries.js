'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'

export async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products`, { next: { tags: ['products'] } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getProduct(productId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/${productId}`, { next: { tags: `products__${productId}` } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function createProduct(_currentState, formData) {
    //const values = Object.fromEntries(formData.entries())
    const session = await auth()
    if (formData.get('image')?.size === 0)
        formData.delete('image')

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                //'Content-Type': 'application/json'
            },
            body: formData //JSON.stringify(values)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            revalidateTag('products')
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

export async function updateProduct(productId, _currentState, formData) {
    //const values = Object.fromEntries(formData.entries())
    const session = await auth()
    if (formData.get('image')?.size === 0)
        formData.delete('image')

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                //'Content-Type': 'application/json'
            },
            body: formData //JSON.stringify(values)
        })

        const result = await response.json()
        if (response.ok) {
            console.log(result)
            revalidateTag('products')
            revalidateTag(`products__${productId}`)
            revalidatePath(`/product/${productId}`, 'page')
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

export async function deleteProduct(productId) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            revalidateTag('products')
            revalidateTag(`products__${productId}`)
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
