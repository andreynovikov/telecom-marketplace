'use client'

import { useSession } from 'next-auth/react'

import Button from '@mui/material/Button'

import { IconDownload } from '@tabler/icons-react'

import { makeSvgIcon } from '@/theme/icons'

import prettyBytes from 'pretty-bytes'

function downloadFile(url, accessToken) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => resolve(xhr))
        xhr.addEventListener('error', () => reject(new Error('File upload failed')))
        xhr.addEventListener('abort', () => reject(new Error('File upload aborted')))
        xhr.open('GET', url, true)
        xhr.responseType = 'arraybuffer'
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
        xhr.send()
    })
}

export default function FileDownload(props) {
    const { scope, file } = props

    const { data: session } = useSession()

    const handleClick = () => {
        downloadFile(`${process.env.NEXT_PUBLIC_API_FILES}/get/${scope}/${file.id}`, session?.user?.access_token)
            .then((xhr) => {
                if (xhr.status != 200)
                    throw new Error(body)

                const type = xhr.getResponseHeader('Content-Type')        
                const blob = new Blob([xhr.response], { type })
                const URL = window.URL || window.webkitURL
                const downloadUrl = URL.createObjectURL(blob)
        
                const a = document.createElement("a")
                if (typeof a.download === undefined) {
                    window.location = downloadUrl
                } else {
                    a.href = downloadUrl
                    a.download = file.name
                    a.style.display = 'none'
                    document.body.appendChild(a)
                    a.click()
                }
        
                setTimeout(() => URL.revokeObjectURL(downloadUrl), 100) // cleanup
            })
            .catch((error) => {
                console.error(error.message)
            })
    }

    return (
        <Button onClick={handleClick} color="secondary" variant="outlined" size="small" startIcon={makeSvgIcon(IconDownload)} sx={{textTransform: 'none'}}>
            Скачать &lsquo;{file.name}&rsquo; ({prettyBytes(file.size)})
        </Button>
    )
}
