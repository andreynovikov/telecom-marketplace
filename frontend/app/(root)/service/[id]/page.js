import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import PageWrapper from '@/components/ui/page-wrapper'

import { IconPaperclip } from '@tabler/icons-react'

import { getService, getServiceFiles } from '@/components/service/queries'

import prettyBytes from 'pretty-bytes'

import styles from '@/components/ui/admin/mdx-editor.module.css'

export default async function Service({ params }) {
    const { id } = params
    const service = await getService(id)
    const files = await getServiceFiles(id)

    return (
        <Container maxWidth="lg">
            <PageWrapper title={service.name}>
                <Card sx={{ p: 3 }}>
                    <Markdown className={styles.prose} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {service.description}
                    </Markdown>
                </Card>
                {files && (
                    <Stack spacing={1} sx={{ p: 3 }}>
                        {files.map((file) => (
                            <div key={file.id}>
                                <IconPaperclip size={16} color="grey" />
                                {' '}
                                <a href={`${process.env.NEXT_PUBLIC_FILES_ROOT}/${file.src}`}>{file.name}</a>
                                {' '}
                                <Typography component="span" color="grey">({prettyBytes(file.size)})</Typography>
                            </div>
                        ))}
                    </Stack>
                )}
            </PageWrapper>
        </Container>
    )
}
