'use client'

import { useState } from 'react'

function uploadFile(url, file, onProgress) {
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
        const formData = new FormData()
        formData.append('file', file)
        xhr.withCredentials = true
        xhr.send(formData)
    })
}

export default function FileUpload(props) {
    const { name, description, variants } = props

    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState(null)
    const [prevFile, setPrevFile] = useState(null)
    const [progress, setProgress] = useState(-1)

    const handleChange = (event) => {
        setFile(event.target.files ? event.target.files[0] : null)
    }

    if (file != prevFile) {
        setPrevFile(file)
        setProgress(0)
        uploadFile(`${process.env.NEXT_PUBLIC_API_ROOT}/user/files`, file, setProgress)
            .then(({status, body}) => {
                if (status != 200)
                    throw new Error(body)
                const result = JSON.parse(body)
                setFileName(result.name)
            })
            .catch((error) => {
                console.error(error.message)
            })
    }

    return (
            <div className="upload_wrapper">
                <p>
                    {description}
                    {variants && <span>({variants})</span>}
                </p>

                <div className="custom_upload">
                    <label htmlFor="cover_letter_file">
                        <input type="hidden" name={name} value={fileName} />
                        <input type="file" id="cover_letter_file" className="files" onChange={handleChange} />
                        <span className="btn btn--round btn--sm">Выбрать файл</span>
                    </label>
                </div>

                <div className="progress_wrapper">
                    <div className="labels clearfix">
                        {file && <p>{file.name}</p>}
                        {progress >= 0 && <span data-width={progress}>{progress}%</span>}
                    </div>
                    {progress >= 0 && (
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: progress + "%" }}>
                                <span className="sr-only">{progress}% Complete</span>
                            </div>
                        </div>
                    )}
                </div>

                <span className="lnr upload_cross lnr-cross"></span>
            </div>
    )
}