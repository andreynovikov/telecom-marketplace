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
        if (previous !== '')
            formData.append('previous', previous)
        xhr.send(formData)
    })
}

export default function FileUpload(props) {
    const { scope, instance, current, onUpload, onDelete } = props

    const [fileName, setFileName] = useState('')
    const [fileSize, setFileSize] = useState(null)
    const [file, setFile] = useState(null)
    const [prevFile, setPrevFile] = useState(null)
    const [progress, setProgress] = useState(-1)

    const { data: session } = useSession()

    useEffect(() => {
        if (current) {
            setFileName(current.name)
            setFileSize(current.size)
        }
    }, [current])

    const handleChange = (files) => {
        setFile(files ? files[0] : null)
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop: handleChange,
        multiple: false,
        maxFiles: 1
    })

    useEffect(() => {
        if (file === null)
            return
        if (prevFile !== null &&
            file.path === prevFile.path &&
            file.size === prevFile.size &&
            file.lastModified === prevFile.lastModified &&
            file.type === prevFile.type)
            return

        setPrevFile(file)
        setProgress(0)
        uploadFile(scope, instance, file, fileName, session?.user?.access_token, setProgress)
            .then(({ status, body }) => {
                if (status != 200)
                    throw new Error(body)
                const result = JSON.parse(body)
                setFileName(result.name)
                setFileSize(result.size)
                setFile(null)
                setProgress(-1)
                if (onUpload !== undefined) onUpload()
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [file])

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(fileName)
    }

    return (
        <Box pt={2} px={2} display="flex" minHeight={80} minWidth={80} textAlign="center" alignItems="center" borderRadius="10px" border="1.5px dashed" flexDirection="column" borderColor="grey.300" justifyContent="center" bgcolor={isDragActive ? "grey.200" : "grey.100"} sx={{
            transition: "all 250ms ease-in-out",
            outline: "none",
            position: "relative",
            ...props?.sx
        }} {...getRootProps()}>
            <input {...getInputProps()} />

            {fileName ? (
                <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0 }} onClick={handleDelete}>
                    <DeleteIcon sx={{ fontSize: 16 }} />
                </IconButton>
            ) : (
                <IconButton><Add /></IconButton>
            )}

            <H6 sx={{ mb: 2 }}>
                {file ? (
                    <>
                        {file.name}
                        {progress >= 0 && progress < 100 && (
                            <>
                                {' '}
                                <Typography component="span" color="grey.600" noWrap>
                                    ({progress}%)
                                </Typography>
                            </>
                        )}
                    </>
                ) : (
                    fileName ? (
                        <>
                            {fileName}
                            {fileSize && (
                                <>
                                    {' '}
                                    <Typography component="span" color="grey.600" noWrap>
                                        ({prettyBytes(fileSize)})
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