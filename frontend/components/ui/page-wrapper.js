import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function PageWrapper({ children, title }) {
    return <Box sx={{ py: 3 }}>
        <Typography variant="h2" component="h3" sx={{ mb: 2 }}>{title}</Typography>
        {children}
    </Box>
}
