'use client'

import { useCallback, useState } from 'react'
import { useSession } from 'next-auth/react'

import Link from 'next/link'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import Sticky from '@/components/theme/sticky'
import Header from '@/components/theme/header/header'
import { SearchInputWithCategory } from '@/components/ui/search-box'

export default function StickyHeader(props) {
    const { scrollDistance, divider } = props

    const [isFixed, setIsFixed] = useState(false)
    const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), [])

    const { status } = useSession()

    /*
    const HEADER_SLOT = status === "authenticated" ? null : <div style={{ marginInline: "auto" }}>
        <Button component={Link} href="/register?as=provider" variant="contained" color="primary">
            Стать поставщиком
        </Button>
        {' '}
        <Button component={Link} href="/register?as=consumer" variant="contained" color="secondary">
            Зарегистрировать заказчика
        </Button>
    </div>
    */

    const HEADER_SLOT = (
        <SearchInputWithCategory />
    )

    return (
        <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={scrollDistance}>
            <Header isFixed={isFixed} midSlot={HEADER_SLOT} />
            {divider && <Divider />}
        </Sticky>
    )
}