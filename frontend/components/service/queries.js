'use server'

import { revalidateTag } from 'next/cache'

import stringify from 'json-sorted-stringify'

import { auth } from '@/lib/auth'

export async function getServices(filters=null) {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ROOT}/services`)

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
        next: { tags: [`services__${key}`] }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getService(serviceId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/${serviceId}`, {
        next: { tags: `services__${serviceId}` }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getServiceFiles(serviceId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/${serviceId}/files`, {
        next: { tags: [`services__files__${serviceId}`] }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function revalidateFiles(serviceId) {
    revalidateTag(`services__files__${serviceId}`)
}

export async function createService(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services`, {
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
            revalidateTag(`services`)
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

export async function updateService(serviceId, _currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    console.log(values)
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/${serviceId}`, {
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
            revalidateTag(`services`)
            revalidateTag(`services__${serviceId}`)
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

export async function deleteService(serviceId, _currentState, _formData) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services/${serviceId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user?.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            revalidateTag(`services`)
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
