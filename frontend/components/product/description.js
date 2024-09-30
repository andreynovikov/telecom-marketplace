import Box from '@mui/material/Box'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import styles from '@/components/ui/admin/mdx-editor.module.css'

export default async function ProductDescription(props) {
    const { product } = props

    if (!!!product.description)
        return null

    return <Box sx={{ mt: 1 }}>
        <Markdown className={styles.prose} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {product.description}
        </Markdown>
    </Box>
}
