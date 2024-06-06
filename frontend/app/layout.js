import Providers from './providers'

import { inter } from '@/theme/font'

export const metadata = {
    title: 'SI-Telecom'
}

export default function Layout({ children }) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
