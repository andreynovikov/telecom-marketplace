'use client'

import { SessionProvider } from 'next-auth/react'
import ThemeProvider from '@/theme/theme-provider'
import SettingsProvider from '@/contexts/SettingContext'
import { SnackbarProvider } from 'notistack'
import { CartProvider } from '@/lib/cart'

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <SettingsProvider>
                <ThemeProvider>
                    <SnackbarProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </SettingsProvider>
        </SessionProvider>
    )
}
