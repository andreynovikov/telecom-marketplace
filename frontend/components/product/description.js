import Box from '@mui/material/Box'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import styles from '@/components/ui/admin/mdx-editor.module.css'

export default async function ProductDescription(props) {
    const { product } = props

    if (!!!product.description)
        return null

    return (
        <Box sx={{ mb: 7.5, mt: 1 }} className={styles.prose}>
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {product.description}
            </Markdown>
        </Box>
    )
}
