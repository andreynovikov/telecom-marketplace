import { getPriceFactor } from './queries'

export default async function PriceFactor(props) {
    const {id} = props
    const factor = await getPriceFactor(id)
    return factor.name
}
