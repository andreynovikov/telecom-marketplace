'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import stringify from 'json-sorted-stringify'

import { auth } from '@/lib/auth'
import sql, { and, comma } from '@/lib/db'

export async function getProducts(filters = null) {
    const select = [
        sql`id`,
        sql`code`,
        sql`name`,
        sql`brand_id`,
        sql`category_id`,
        sql`description`,
        sql`price`
    ]
    const from = [sql`product`]
    const where = []
    let order = 'product.name, product.id'

    //let key = ''
    if (filters !== null) {
        for (const filter of filters)
            if (filter.field === 'text') {
                select.push(sql`ts_rank_cd(product.fts_vector, query) AS rank`)
                from.push(sql`plainto_tsquery('russian', ${filter.value}) AS query`)
                where.push(sql`product.fts_vector @@ query`)
                order = 'rank DESC'
            }
            /*
            if (Array.isArray(filter.value)) {
                for (const value of filter.value)
                    url.searchParams.append(filter.field, value)
            } else {
                url.searchParams.append(filter.field, filter.value)
            }
            */
        //key = '__' + stringify(filters)
    }

    const products = await sql`
        SELECT ${comma(select)} FROM ${comma(from)}
        ${where.length > 0 ? sql`
        WHERE ${and(where)}
        ` : sql``}
        ORDER BY ${sql`${order}`}
    `

    return products
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
    const product = await sql`
        SELECT
            id,
            code,
            name,
            brand_id AS brand,
            category_id AS category,
            description,
            price,
            stock,
            add_watermark
        FROM product
        WHERE id = ${productId}
    `
    return product[0]
}

export async function getRelatedProducts(product) {
    const related = []

    let categoryId = product.category
    while (related.length < 4) {
        const products = await sql`
            SELECT
                id,
                code,
                name,
                brand_id AS brand,
                category_id AS category,
                description,
                price,
                stock,
                add_watermark
            FROM product
            WHERE
                id != ${product.id} AND
                category_id = ${categoryId}
            ORDER BY random()
            LIMIT ${4 - related.length}
        `
        related.push(...products)
        const category = (await sql`
            SELECT
                id,
                parent_id
            FROM productcategory
            WHERE id = ${categoryId}
        `)[0]
        if (category.parent_id === null)
            break
        categoryId = category.parent_id
    }
    if (related.length < 4) {
        const products = await sql`
            SELECT
                id,
                code,
                name,
                brand_id AS brand,
                category_id AS category,
                description,
                price,
                stock,
                add_watermark
            FROM product
            WHERE
                id != ${product.id}
            ORDER BY random()
            LIMIT ${4 - related.length}
        `
        related.push(...products)
    }

    return related
}

export async function getProductImages(productId) {
    const images = (await sql`
        SELECT id, file, width, height
        FROM productimage
        WHERE product_id = ${productId}
        ORDER BY seq
    `).map(image => ({
        ...image,
        src: `/products/${productId}/${image.file}`
    }))
    return images
}

export async function revalidateImages(productId) {
    revalidateTag(`products__images__${productId}`)
    revalidatePath(`/product/${productId}`, 'page')
}

export async function createProduct(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    const session = await auth()

    if (values['stock'] === '')
	values['stock'] = null

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

    if (values['stock'] === '')
	values['stock'] = null

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
