import { useState, useEffect } from 'react'
import Link from 'next/link'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'
import ContractorStatus from '@/components/contractor/admin/status'

import { makeSvgIcon } from '@/theme/icons'
import { IconClipboardText } from '@tabler/icons-react'

import { getUserContractors } from '../queries'

const ViewFormIcon = () => makeSvgIcon(IconClipboardText)

export default function ContractorLink({ userId }) {
    const [contractors, setContractors] = useState([])

    useEffect(() => {
        getUserContractors(userId).then((result) => setContractors(result))
    }, [userId])

    if (!!!userId || contractors.length === 0)
        return null

    return contractors.map((contractor) => (
        <Link href={`contractors/${contractor.id}`} passHref key={contractor.id}>
            <StyledIconButton>
                <ContractorStatus status={contractor.status} hideText />
            </StyledIconButton>
        </Link>
    ))
}