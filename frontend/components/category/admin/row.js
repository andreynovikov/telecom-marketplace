import { StyledTableRow, StyledTableCell } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ServiceRow from '@/components/service/admin/row'
import { getServices } from '@/components/service/queries'

import { IconCornerRightDown } from '@tabler/icons-react'

import CategoryActions from './actions'


export default async function CategoryRow({ category }) {
    const services = await getServices(category.id)
    const count = services.length || 0

    return (
        <>
            <StyledTableRow tabIndex={-1}>
                <StyledTableCell align="left" style={{ verticalAlign: 'top' }} rowSpan={count + 1}>
                    {category.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                    <IconCornerRightDown />
                </StyledTableCell>
                <StyledTableCell align="center">
                    <CategoryActions category={category} />
                </StyledTableCell>
            </StyledTableRow>
            { services.map(service => <ServiceRow key={service.id} service={service} category={category} />)}
        </>
    )
}
