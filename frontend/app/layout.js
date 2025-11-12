import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import Providers from './providers'

import { inter } from '@/theme/font'

import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

export const metadata = {
    title: 'SI-Telecom'
}

export default function Layout({ children }) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={inter.className}>
                <InitColorSchemeScript attribute="data" />
                <AppRouterCacheProvider>
                    <Providers>
                        {children}
                    </Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
