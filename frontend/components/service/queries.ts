export interface ServiceType {
    id: number;
    name: string;
}

const serviceKeys = {
    all: ['services'],
    lists: () => [...serviceKeys.all, 'list'],
    list: (category: number) => [...serviceKeys.lists(), { category }],
    details: () => [...serviceKeys.all, 'detail'],
    detail: (id: number) => [...serviceKeys.details(), id],
}

function serializeKey(key: (string | number | {})[]) {
    return JSON.stringify(key)
}

export async function getServices(categoryId: number) {
    const res = await fetch(`${process.env.API_ROOT}/services?category=${categoryId}`, { next: { tags: [serializeKey(serviceKeys.list(categoryId))] } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
