'use client'

import Grid from '@mui/material/Grid'

import FileUpload from './file-upload'
import { useState } from 'react'

// sorting: https://github.com/ValentinH/react-easy-sort

export default function FilesManager(props) {
    const { files, scope, instance } = props
    const [slots, setSlots] = useState(1)

    const increaseSlots = () => setSlots((slots) => slots + 1)

    return (
        <Grid container spacing={2}>
            {files.map((file) => (
                <Grid item key={file.id} sx={{display: 'flex'}}>
                    <FileUpload current={file} scope={scope} instance={instance} />
                </Grid>
            ))}
            {[...Array(slots)].map((_, i) => (
                <Grid item key={i} sx={{display: 'flex'}}>
                    <FileUpload scope={scope} instance={instance} onUpload={increaseSlots} />
                </Grid>
            ))}
        </Grid>
    )
}