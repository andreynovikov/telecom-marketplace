'use client'

import { Fragment, useCallback, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Button from '@mui/material/Button'
import Divider from "@mui/material/Divider"
// GLOBAL CUSTOM COMPONENTS

import Sticky from "./sticky"
import Footer from "./footer"
import Header from "./header"
import NavigationList from "./navbar/nav-list/nav-list"
import { MobileNavigationBar } from "./mobile-navigation"

export default function ThemeLayout({ children }) {
    const [isFixed, setIsFixed] = useState(false)
    const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), [])
    const { status } = useSession()

    const HEADER_SLOT = status === "authenticated" ? null : <div style={{ marginInline: "auto" }}>
        <Button component={Link} href="/register?as=provider" variant="contained" color="primary">
            Стать поставщиком
        </Button>
        {' '}
        <Button component={Link} href="/register?as=consumer" variant="contained" color="secondary">
            Зарегистрировать заказчика
        </Button>
    </div>

    return (
        <Fragment>
            <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
                <Header isFixed={isFixed} midSlot={HEADER_SLOT} />
                <Divider />
            </Sticky>
            {children}
            <MobileNavigationBar />
            <Footer />
        </Fragment>
    )
}
