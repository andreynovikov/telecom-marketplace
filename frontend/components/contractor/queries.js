'use server'

import { z } from 'zod'
import { revalidateTag } from 'next/cache'

import { auth } from '@/lib/auth'

export async function getContractors(filters=null) {
    const session = await auth()

    if (!!!session)
        return {}

    const url = new URL(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors`)

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
            revalidate: 3600,
            tags: filters !== null ? undefined : ['contractors']
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

export async function getContractor(id) {
    const session = await auth()

    if (!!!session)
        return {}

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors/${id}`, {
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
    values.end_consumer = !!values.end_consumer

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors`, {
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

export async function updateContractor(contractorId, values) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors/${contractorId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const result = await response.json();
        if (response.ok) {
            revalidateTag('contractors')
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

export async function deleteContractor(contractorId) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors/${contractorId}`, {
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

const catalogueSchema = z.object({
    catalogue: z.number().positive().array().optional()
})

export async function saveCatalogue(_currentState, formData) {
    console.log(formData)
    const values = {}
    for (const key of formData.keys()) {
        if (key.startsWith('$')) // nextjs action fields
            continue
        if (['catalogue'].includes(key))
            values[key] = formData.getAll(key).map(v => + v)
        else
            values[key] = formData.get(key)
    }
    console.log(values)
    const session = await auth()

    const validated = catalogueSchema.passthrough().safeParse(values)

    if (!validated.success) {
        console.log(validated.error.flatten())
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    if (!('catalogue' in validated.data))
        validated.data['catalogue'] = []

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors`, {
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

const geographySchema = z.object({
    geography: z.number().positive().min(1).max(99).array().optional()
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

    if (!validated.success) {
        console.log(validated.error.flatten())
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    if (!('geography' in validated.data))
        validated.data['geography'] = []

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/contractors`, {
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
