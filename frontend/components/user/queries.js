'use server'

import { z } from 'zod'
import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'

export async function getUsers() {
    const session = await auth()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users`, {
        headers: {
            'Authorization': `Bearer ${session?.user?.access_token}`
        },
        next: { tags: ['users'] }
    })

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return response.json()
}

export async function getUser(userId) {
    const session = await auth()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users/${userId}`, {
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

const userSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().min(10).optional().or(z.literal('')),
    admin: z.boolean()
}).required({
    name: true,
    email: true
})

export async function createUser(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users`, {
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
            revalidateTag('users')
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

export async function updateUser(userId, _currentState, formData) {
    const values = {}
    for (const key of formData.keys()) {
        if (key.startsWith('$')) // nextjs action fields
            continue
        else
            values[key] = formData.get(key)
    }
    if (values.password === '')
        delete values.password
    values.admin = !!values.admin
    const session = await auth()

    const validated = userSchema.passthrough().safeParse(values)
    console.log(validated)

    if (!validated.success) {
        console.log(validated.error.flatten())
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validated.data)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            revalidateTag('users')
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

export async function deleteUser(userId) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            revalidateTag('users')
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
