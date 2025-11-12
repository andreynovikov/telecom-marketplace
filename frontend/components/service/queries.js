'use server'

import { revalidateTag } from 'next/cache'

import stringify from 'json-sorted-stringify'

import { auth } from '@/lib/auth'
import sql, { and, comma } from '@/lib/db'

export async function getServices(filters=null) {
    const select = [
        sql`id`,
        sql`short_name`,
        sql`name`,
        sql`description`,
        sql`category_id`,
    ]
    const from = [sql`service`]
    const where = []
    let order = 'service.name'

    //let key = ''
    if (filters !== null) {
        for (const filter of filters)
            if (filter.field === 'text') {
                select.push(sql`ts_rank_cd(service.fts_vector, query) AS rank`)
                from.push(sql`plainto_tsquery('russian', ${filter.value}) AS query`)
                where.push(sql`service.fts_vector @@ query`)
                order = 'rank DESC'
            } else if (Array.isArray(filter.value)) {
                const field = sql(`service.${filter.field}`)
                where.push(sql`${field} in ${sql(filter.value)}`)
            } else {
                const field = sql(`service.${filter.field}`)
                where.push(sql`${field} = ${filter.value}`)
            }
        //key = '__' + stringify(filters)
    }

    const services = await sql`
        SELECT ${comma(select)} FROM ${comma(from)}
        ${where.length > 0 ? sql`
        WHERE ${and(where)}
        ` : sql``}
        ORDER BY ${sql`${order}`}
    `

    return services
}

export async function getService(serviceId) {
        const service = await sql`
        SELECT
            id,
            short_name,
            name,
            description,
            category_id AS category
        FROM service
        WHERE id = ${serviceId}
    `
    return service[0]
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
