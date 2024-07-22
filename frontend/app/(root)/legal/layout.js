import Container from '@mui/material/Container'

export default function LegalLayout({children}) {
    return (
        <Container maxWidth="lg">{children}</Container>
    )
}