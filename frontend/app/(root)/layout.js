import { Fragment } from 'react'

import Footer from "@/components/theme/footer"
//import NavigationList from "./navbar/nav-list/nav-list"
import { MobileNavigationBar } from "@/components/theme/mobile-navigation"
import StickyHeader from '@/components/ui/sticky-header'

export const revalidate = 0

export default function RootLayout({ children }) {
    return (
        <Fragment>
            <StickyHeader scrollDistance={300} />
            {children}
            <MobileNavigationBar />
            <Footer />
        </Fragment>
    )
}
