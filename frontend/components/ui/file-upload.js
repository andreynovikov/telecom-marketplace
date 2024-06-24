'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'

import { useDropzone } from 'react-dropzone'

import { H6, Small } from '@/components/theme/Typography'

function uploadFile(url, file, accessToken, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', e => {
            console.log(e.loaded, e.total)
            onProgress(Math.round(e.loaded / e.total * 100))
        })
        xhr.addEventListener('load', () => resolve({ status: xhr.status, body: xhr.responseText }))
        xhr.addEventListener('error', () => reject(new Error('File upload failed')))
        xhr.addEventListener('abort', () => reject(new Error('File upload aborted')))
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
        const formData = new FormData()
        formData.append('file', file)
        xhr.send(formData)
    })
}

export default function FileUpload(props) {
    const { name, defaultValue, description, variants } = props

    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState(null)
    const [prevFile, setPrevFile] = useState(null)
    const [progress, setProgress] = useState(-1)

    const { data: session } = useSession()

    useEffect(() => {
        if (defaultValue)
            setFileName(defaultValue)
    }, [defaultValue])

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
    });

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
        uploadFile(process.env.NEXT_PUBLIC_API_FILES, file, session?.user?.access_token, setProgress)
            .then(({ status, body }) => {
                if (status != 200)
                    throw new Error(body)
                const result = JSON.parse(body)
                setFileName(result.name)
                setFile(null)
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [file])

    return (
        <Box py={4} px={{
            md: 10,
            xs: 4
        }} display="flex" minHeight="200px" textAlign="center" alignItems="center" borderRadius="10px" border="1.5px dashed" flexDirection="column" borderColor="grey.300" justifyContent="center" bgcolor={isDragActive ? "grey.200" : "grey.100"} sx={{
            transition: "all 250ms ease-in-out",
            outline: "none"
        }} {...getRootProps()}>
            <input {...getInputProps()} />

            <H6 mb={1} color="grey.600">
                Перетащите сюда {description}
            </H6>

            <Divider sx={{
                "::before, ::after": {
                    borderColor: "grey.300",
                    width: 70
                }
            }}>
                <Small color="text.disabled" px={1}>
                    или
                </Small>
            </Divider>

            <Button type="button" variant="outlined" color="info" sx={{
                px: 4,
                my: 4,
                textTransform: "none"
            }}>
                Выберите файл
            </Button>

            <Small color="grey.600" sx={{ mb: 2 }}>{variants}</Small>

            <input type="hidden" name={name} value={fileName} />

            {progress >= 0 && progress < 100 && (
                <LinearProgress variant="determinate" value={progress} />
            )}

            <H6>
                {file ? <p>{file.name}</p> : fileName ? <p>{fileName}</p> : ''}
            </H6>
        </Box>
    )
}