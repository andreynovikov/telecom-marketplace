'use client'

import { SessionProvider } from 'next-auth/react'
import ThemeProvider from '@/theme/theme-provider'
import CartProvider from '@/contexts/CartContext'
import SettingsProvider from '@/contexts/SettingContext'

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <CartProvider>
                <SettingsProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </SettingsProvider>
            </CartProvider>
        </SessionProvider>
    )
}
