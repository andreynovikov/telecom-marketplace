import ThemeLayout from '@/components/theme/layout'

export default function RootLayout({ children }) {
    return (
        <ThemeLayout>
            {children}
        </ThemeLayout>
    )
}
