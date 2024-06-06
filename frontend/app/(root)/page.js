import Box from '@mui/material/Box'

import CategoryList from '@/components/category/list'

export default function Index() {
    return (
        <Box id="top" overflow="hidden" bgcolor="background.paper">
            <CategoryList />
        </Box>
    )
}
