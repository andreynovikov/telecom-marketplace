'use server'

import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'
import sql from '@/lib/db'

export async function getCategories() {
    const categories = await sql`
        SELECT
            id,
            name,
            parent_id AS parent
        FROM servicecategory
        ORDER BY parent_id, seq
    `
    return categories
}

export async function getCategory(categoryId) {
    const category = await sql`
        SELECT
            id,
            name,
            parent_id AS parent
        FROM servicecategory
        WHERE id = ${categoryId}
    `
    return category[0]
}

export async function createCategory(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/categories`, {
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
            revalidateTag('services__categories')
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
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/categories/${categoryId}`, {
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
            revalidateTag('services__categories')
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            revalidateTag('services__categories')
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
