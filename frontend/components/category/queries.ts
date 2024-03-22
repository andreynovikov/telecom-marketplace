export interface CategoryType {
    id: number;
    name: string;
}

const categoryKeys = {
    all: ['categories'],
    lists: () => [...categoryKeys.all, 'list'],
    details: () => [...categoryKeys.all, 'detail'],
    detail: (id: number) => [...categoryKeys.details(), id],
}

function serializeKey(key: string[]) {
    return JSON.stringify(key)
}

export async function getCategories() {
    const res = await fetch(`${process.env.API_ROOT}/categories`, { next: { tags: [serializeKey(categoryKeys.lists())] } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
