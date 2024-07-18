import { getBrand } from './queries'

export default async function Brand(props) {
    const {id} = props
    const brand = await getBrand(id)
    return brand.name
}
