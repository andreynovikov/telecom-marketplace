import { getCategory } from './queries'

export default async function Category(props) {
    const {id} = props
    const category = await getCategory(id)
    return category.name
}
