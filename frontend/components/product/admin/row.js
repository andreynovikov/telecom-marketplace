import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import Brand from '@/components/brand'
import Category from '../category'
import ProductActions from './actions'

import { IconCheck, IconX } from '@tabler/icons-react'

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
                <StyledTableCell align="center">
                    {product.image ? <IconCheck size={20} /> : <IconX size={20} />}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {product.description ? <IconCheck size={20} /> : <IconX size={20} />}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <ProductActions product={product} />
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}
