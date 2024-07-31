'use server'

import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'

export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/categories`, {
        next: { tags: ['products__categories'] }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function createCategory(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/categories`, {
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
            revalidateTag('products__categories')
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

export async function updateCategory(categoryId, _currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    if (values.parent === 'null')
        values.parent = null
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            revalidateTag('products__categories')
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

export async function deleteCategory(categoryId) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/products/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            revalidateTag('products__categories')
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
