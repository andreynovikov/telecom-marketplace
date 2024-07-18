import { useState } from 'react'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import prettyBytes from 'pretty-bytes'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

export default function ImageUpload(props) {
    const { name } = props
    const [selectedFile, setSelectedFile] = useState('')

    const handleChange = (event) => {
        const file = event.target.files ? event.target.files[0] : null
        setSelectedFile(file ? `${file.name} (${prettyBytes(file.size)})`: '')
    }

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<AttachFileIcon />}
            sx={{my: 0.5}}
            style={{textTransform: 'none'}}
        >
            {selectedFile || 'загрузить'}
            <VisuallyHiddenInput name={name} type="file" accept="image/png, image/jpeg" onChange={handleChange} />
        </Button>
    )
}
