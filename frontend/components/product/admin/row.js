import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Brand from '@/components/brand'
import Category from '../category'
import ProductActions from './actions'

export default async function ProductRow({ product }) {
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
                    <Brand id={product.brand} />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <Category id={product.category} />
                </StyledTableCell>
                <StyledTableCell align="right">
                    {product.price}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {product.stock !== null ? product.stock : '-'}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {product.images.length > 0 ? product.images.length : '-'}
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
