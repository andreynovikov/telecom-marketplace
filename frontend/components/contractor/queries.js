'use server'

import { z } from 'zod'
import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'

export async function getContractors() {
    const session = await auth()

    if (!!!session)
        return {}

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors`, {
        next: { tags: ['contractors'] },
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
        next: { tags: ['contractors'] },
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

const contractorSchema = z.object({
    name: z.string().trim().min(1),
    inn: z.string().trim().regex(/^[\d+]{10,12}$/, { message: "Должен содержать 10 или 12 цифр" })
}).required({
    name: true,
    inn: true
})

export async function saveContractor(_currentState, formData) {
    const values = {}
    for (const key of formData.keys()) {
        if (key.startsWith('$')) // nextjs action fields
            continue
        if (['geography'].includes(key))
            values[key] = formData.getAll(key)
        else
            values[key] = formData.get(key)
    }
    console.log(values)
    const session = await auth()

    const validated = contractorSchema.passthrough().safeParse(values)
    console.log(validated)

    if (!validated.success) {
        console.log(validated.error.flatten())
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validated.data)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            revalidateTag('contractors')
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

export async function deleteContractor(contracorId) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors/${contracorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            revalidateTag('contractors')
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

const geographySchema = z.object({
    geography: z.number().positive().min(1).max(99).array()
})

export async function saveGeography(_currentState, formData) {
    console.log(formData)
    const values = {}
    for (const key of formData.keys()) {
        if (key.startsWith('$')) // nextjs action fields
            continue
        if (['geography'].includes(key))
            values[key] = formData.getAll(key).map(v => + v)
        else
            values[key] = formData.get(key)
    }
    console.log(values)
    const session = await auth()

    const validated = geographySchema.passthrough().safeParse(values)
    console.log(validated)

    if (!validated.success) {
        console.log(validated.error.flatten())
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/user/contractors`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validated.data)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            revalidateTag('contractors')
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
