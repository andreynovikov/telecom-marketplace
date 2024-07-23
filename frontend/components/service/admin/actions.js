'use client'

import { useState } from 'react'

import { EditIcon, DeleteIcon } from '@/theme/icons'

import { StyledIconButton } from '@/components/theme/pages-sections/vendor-dashboard/styles'

import ServiceEditDialog from './form'

import { deleteService } from '../queries'

export function ServiceActions(props) {
    const { service, categoryId } = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setOpen(true)}>
                <EditIcon />
            </StyledIconButton>

            <StyledIconButton onClick={async () => await deleteService(service.id, categoryId)}>
                <DeleteIcon />
            </StyledIconButton>

            <ServiceEditDialog service={service} categoryId={categoryId} open={open} setOpen={setOpen} />
        </>
    )
}
