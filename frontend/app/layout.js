import { Inter } from 'next/font/google'

import Header from '@/components/ui/header'

import Providers from './providers'

import '@/styles/global.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
    title: 'SI-Telecom'
}

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <main>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}
