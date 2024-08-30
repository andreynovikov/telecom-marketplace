import { Fragment } from 'react'

import StickyWrapper from '@/components/theme/sticky-wrapper'
import { MobileNavigationBar } from '@/components/theme/mobile-navigation'
import Footer from '@/components/theme/layouts/shop-layout-4/footer'

import ServiceSidebarMenu from '@/components/service/menu' 
import StickyHeader from '@/components/ui/sticky-header'

export default function HomeLayout({
    children
}) {
    const Sidebar = <Fragment>
        <ServiceSidebarMenu />
        <Footer />
    </Fragment>

    return <div className="bg-white">
        <StickyHeader scrollDistance={70} />

        <StickyWrapper SideNav={Sidebar}>{children}</StickyWrapper>

        <MobileNavigationBar />
    </div>
}
