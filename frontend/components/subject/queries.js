export async function getSubjects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/subjects`, { next: { tags: 'subjects' } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
