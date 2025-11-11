'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import Add from "@mui/icons-material/Add"
import { DeleteIcon } from '@/theme/icons'

import { useDropzone } from 'react-dropzone'

import { H6 } from '@/components/theme/Typography'

import prettyBytes from 'pretty-bytes'

function uploadFile(scope, instance, file, previous, accessToken, onProgress) {
    return new Promise((resolve, reject) => {
        const url = `${process.env.NEXT_PUBLIC_API_FILES}/${scope}/${instance}`
        const xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', e => onProgress(Math.round(e.loaded / e.total * 100)))
        xhr.addEventListener('load', () => resolve({ status: xhr.status, body: xhr.responseText }))
        xhr.addEventListener('error', () => reject(new Error('File upload failed')))
        xhr.addEventListener('abort', () => reject(new Error('File upload aborted')))
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
        const formData = new FormData()
        formData.append('file', file)
        if (previous !== null)
            formData.append('previous', previous.file)
        xhr.send(formData)
    })
}

export default function FileUpload(props) {
    const { scope, instance, current, onUpload, onDelete, accept } = props

    const [serverFile, setServerFile] = useState(null)
    const [clientFile, setClientFile] = useState(null)
    const [prevClientFile, setPrevClientFile] = useState(null)
    const [progress, setProgress] = useState(-1)

    const { data: session } = useSession()

    useEffect(() => {
        if (current)
            setServerFile(current)
    }, [current])

    const handleChange = (files) => {
        setClientFile(files ? files[0] : null)
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop: handleChange,
        multiple: false,
        maxFiles: 1,
        accept
    })

    useEffect(() => {
        if (clientFile === null)
            return
        if (prevClientFile !== null &&
            clientFile.path === prevClientFile.path &&
            clientFile.size === prevClientFile.size &&
            clientFile.lastModified === prevClientFile.lastModified &&
            clientFile.type === prevClientFile.type)
            return

        setPrevClientFile(clientFile)
        setProgress(0)
        uploadFile(scope, instance, clientFile, serverFile, session?.user?.access_token, setProgress)
            .then(({ status, body }) => {
                if (status != 200)
                    throw new Error(body)
                const result = JSON.parse(body)
                setServerFile(result)
                setClientFile(null)
                setProgress(-1)
                if (onUpload !== undefined) onUpload()
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [clientFile])

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(serverFile)
    }

    return (
        <Box
            {...getRootProps()}
            sx={{
                pt: 2,
                px: 2,
                display: "flex",
                minHeight: 80,
                minWidth: 80,
                textAlign: "center",
                alignItems: "center",
                borderRadius: "10px",
                border: "1.5px dashed",
                flexDirection: "column",
                borderColor: "grey.300",
                justifyContent: "center",
                bgcolor: isDragActive ? "grey.200" : "grey.100",
                transition: "all 250ms ease-in-out",
                outline: "none",
                position: "relative",
                ...props?.sx
            }}>
            <input {...getInputProps()} />

            {serverFile ? (
                <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0 }} onClick={handleDelete}>
                    <DeleteIcon sx={{ fontSize: 16 }} />
                </IconButton>
            ) : (
                <IconButton><Add /></IconButton>
            )}

            <H6 sx={{ mb: 2 }}>
                {clientFile ? (
                    <>
                        {clientFile.name}
                        {progress >= 0 && progress < 100 && (
                            <>
                                {' '}
                                <Typography component="span" noWrap sx={{ color: "grey.600" }}>
                                    ({progress}%)
                                </Typography>
                            </>
                        )}
                    </>
                ) : (
                    serverFile ? (
                        <>
                            {serverFile?.name || serverFile.file}
                            {serverFile?.size && (
                                <>
                                    {' '}
                                    <Typography component="span" noWrap sx={{ color: "grey.600" }}>
                                        ({prettyBytes(serverFile.size)})
                                    </Typography>
                                </>
                            )}
                        </>
                    ) : ''
                )}
            </H6>

            {progress >= 0 && progress < 100 && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
            )}
        </Box>
    )
}