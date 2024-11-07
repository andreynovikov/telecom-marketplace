import { Fragment } from 'react'
import Link from 'next/link'

import StickyWrapper from '@/components/theme/sticky-wrapper'
import { MobileNavigationBar } from '@/components/theme/mobile-navigation'
import Footer from '@/components/theme/layouts/shop-layout-4/footer'
import Scrollbar from "@/components/theme/scrollbar"

import ProductSidebarMenu from '@/components/product/menu'
import ServiceSidebarMenu from '@/components/service/menu'
import StickyHeader from '@/components/ui/sticky-header'
import { H5 } from '@/components/theme/Typography'

export default function HomeLayout({
    children
}) {
    const Sidebar = <Fragment>
        <Scrollbar autoHide clickOnTrack={false} sx={{
            overflowX: "hidden",
            height: "calc(100dvh - (120px + 87px))"
        }}>
            <H5 sx={{my: 1}}>Услуги</H5>
            <ServiceSidebarMenu />
            <H5 sx={{mt: 2, mb: 1}}><Link href="/">Товары</Link></H5>
            <ProductSidebarMenu />
        </Scrollbar>
        <Footer />
    </Fragment>

    return <div className="bg-white">
        <StickyHeader scrollDistance={70} />

        <StickyWrapper SideNav={Sidebar}>{children}</StickyWrapper>

        {/* <MobileNavigationBar /> SET mb xs: 7 IN footer WHEN uncommented */ }
    </div>
}
