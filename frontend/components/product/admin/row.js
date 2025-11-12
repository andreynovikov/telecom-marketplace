import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Brand from '@/components/brand'
import Category from '../category'
import { getProductImages } from '../queries'
import ProductActions from './actions'

export default async function ProductRow({ product }) {
    const images = await getProductImages(product.id)

    return (
        <>
            <StyledTableRow tabIndex={-1}>
                <StyledTableCell align="left">
                    {product.code}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {product.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                    <Brand id={product.brand_id} />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <Category id={product.category_id} />
                </StyledTableCell>
                <StyledTableCell align="right">
                    {product.price}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {product.stock !== null ? product.stock : '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {images.length > 0 ? images.length : '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {product.description ? 'есть' : '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <ProductActions product={product} />
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}
