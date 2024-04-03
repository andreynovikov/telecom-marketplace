const serviceKeys = {
    all: ['services'],
    lists: () => [...serviceKeys.all, 'list'],
    list: (category) => [...serviceKeys.lists(), { category }],
    details: () => [...serviceKeys.all, 'detail'],
    detail: (id) => [...serviceKeys.details(), id],
}

function serializeKey(key) {
    return JSON.stringify(key)
}

export async function getServices(categoryId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/services?category=${categoryId}`, { next: { tags: [serializeKey(serviceKeys.list(categoryId))] } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
