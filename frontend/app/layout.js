import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

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
        <html lang="ru">
            <body className={inter.className}>
                <InitColorSchemeScript />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
