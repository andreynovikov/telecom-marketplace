'use client'

import { useState } from 'react'

import Add from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"

import { FlexBox } from "@/components/theme/flex-box"

import ServiceEditDialog from './form'

export default function AddAction() {
    const [serviceOpen, setServiceOpen] = useState(false)

    const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

    return (
        <>
            <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
                <div />
                <Button onClick={() => setServiceOpen(true)} color="info" fullWidth={downSM} variant="contained" startIcon={<Add />} sx={{ minHeight: 44 }}>
                    Добавить услугу
                </Button>
            </FlexBox>
            <ServiceEditDialog open={serviceOpen} setOpen={setServiceOpen} />
        </>
    )
}