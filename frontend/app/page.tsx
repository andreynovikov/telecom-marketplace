//import { auth } from 'auth'

import CategoryList from '@/components/category/list'

export default async function Index() {
    const session = null; //await auth()

    return (
        <div>
            <CategoryList />
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    )
}
