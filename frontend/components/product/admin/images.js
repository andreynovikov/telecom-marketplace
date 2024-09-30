'use client'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import FilesManager from '@/components/ui/admin/file-manager'

import { revalidateImages } from '../queries'

export default function ProductImagesDialog(props) {
    const { product, open, setOpen } = props

    const handleClose = async () => {
        await revalidateImages(product.id)
        setOpen(false)
    }

    return (
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
            <DialogContent>
                <FilesManager
                    files={product.images}
                    scope="products"
                    instance={product.id}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpg', '.jpeg']
                    }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}
