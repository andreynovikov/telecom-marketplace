import { H3 } from '@/components/theme/Typography'

export default async function ProductDescription(props) {
    const { product } = props

    if (!!!product.description)
        return null

    return <div>
        <H3 mb={2}>Описание:</H3>
        <div>
            {product.description}
        </div>
    </div>
}
