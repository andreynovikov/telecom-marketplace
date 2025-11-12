'use client'

import { SessionProvider } from 'next-auth/react'
import MuiThemeProvider from '@/theme/theme-provider'
import SettingsProvider from '@/contexts/SettingContext'
import { SnackbarProvider } from 'notistack'
import { CartProvider } from '@/lib/cart'

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <SettingsProvider>
                <MuiThemeProvider>
                    <SnackbarProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </SnackbarProvider>
                </MuiThemeProvider>
            </SettingsProvider>
        </SessionProvider>
    )
}
