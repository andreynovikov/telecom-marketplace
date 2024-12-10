'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import stringify from 'json-sorted-stringify'

import { auth } from '@/lib/auth'

export async function getProducts(filters = null) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ROOT}/products`)

    let key = ''
    if (filters !== null) {
        for (const filter of filters)
            if (Array.isArray(filter.value)) {
                for (const value of filter.value)
                    url.searchParams.append(filter.field, value)
            } else {
                url.searchParams.append(filter.field, filter.value)
            }
        key = '__' + stringify(filters)
    }

    const res = await fetch(url.toString(), {
        next: { tags: [`products__${key}`] }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getProductsCsvStream(filters = null) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ROOT}/products/export`)

    if (filters !== null) {
        for (const filter of filters)
            if (Array.isArray(filter.value)) {
                for (const value of filter.value)
                    url.searchParams.append(filter.field, value)
            } else {
                url.searchParams.append(filter.field, filter.value)
            }
    }

    const session = await auth()
    let headers = {}
    if (session?.user?.access_token)
        headers['Authorization'] = `Bearer ${session.user.access_token}`
    const res = await fetch(url.toString(), { headers })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    headers = {}
    for (const [header, value] of res.headers.entries())
        if (header.startsWith('content'))
            headers[header] = value

    return [headers, res.body]
}

export async function getProduct(productId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/${productId}`, { next: { tags: `products__${productId}` } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getRelatedProducts(productId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/${productId}/related`, {
        next: { tags: [`products__${productId}__related`] }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function revalidateImages(productId) {
    revalidateTag(`products__images__${productId}`)
    revalidatePath(`/product/${productId}`, 'page')
}

export async function createProduct(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const result = await response.json()
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
    const values = Object.fromEntries(formData.entries())
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
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
        })

        const result = await response.json()
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
