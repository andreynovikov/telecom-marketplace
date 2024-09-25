'use client'

import { useState } from 'react'

import { EditIcon, AttachIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ServiceEditDialog from './form'
import ServiceFilesDialog from './files'

import { deleteService } from '../queries'

export function ServiceActions(props) {
    const { service, categoryId } = props
    const [editOpen, setEditOpen] = useState(false)
    const [filesOpen, setFilesOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setEditOpen(true)}>
                <EditIcon />
            </StyledIconButton>

            <StyledIconButton onClick={() => setFilesOpen(true)}>
                <AttachIcon />
            </StyledIconButton>

            <StyledIconButton onClick={async () => await deleteService(service.id, categoryId)}>
                <DeleteIcon />
            </StyledIconButton>

            <ServiceEditDialog service={service} categoryId={categoryId} open={editOpen} setOpen={setEditOpen} />
            <ServiceFilesDialog service={service} open={filesOpen} setOpen={setFilesOpen} />
        </>
    )
}
