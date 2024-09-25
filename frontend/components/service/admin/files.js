'use client'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import FilesManager from '@/components/ui/admin/file-manager'

import { revalidateFiles } from '../queries'

export default function ServiceFilesDialog(props) {
    const { service, open, setOpen } = props

    const handleClose = async () => {
        await revalidateFiles(service.id)
        setOpen(false)
    }

    return (
        <Dialog open={open} maxWidth="lg" onClose={handleClose}>
            <DialogContent>
                <FilesManager files={service.files} scope="services" instance={service.id} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}
