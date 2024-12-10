import { auth } from '@/lib/auth'

import { getProductsCsvStream } from '@/components/product/queries'

export const GET = auth(async (request) => { // we do not need auth here
    const searchParams = request.nextUrl.searchParams
    const filters = []
    for (const [field, value] of searchParams.entries()) {
        filters.push({ field, value }) // TODO: add support for multiple values
    }

    const [ headers, stream ] = await getProductsCsvStream(filters)
    return new Response(stream, {
        headers: new Headers(headers)
    })
})
