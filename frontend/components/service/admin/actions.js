'use client'

import { useState } from 'react'

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import { StyledIconButton } from "@/components/theme/pages-sections/vendor-dashboard/styles";

import ServiceEditDialog from './form'

import { deleteService } from '../queries'

export function ServiceActions(props) {
    const { service, categoryId } = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <StyledIconButton onClick={() => setOpen(true)}>
                {service?.id ? <Edit /> : <Add />}
            </StyledIconButton>

            <StyledIconButton onClick={async () => await deleteService(service?.id, categoryId)}>
                <Delete />
            </StyledIconButton>

            <ServiceEditDialog service={service} categoryId={categoryId} open={open} setOpen={setOpen} />
        </>
    )
}
